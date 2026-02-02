import * as path from 'path';
import * as vscode from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node';

let client: LanguageClient;

/**
 * Основная функция активации LSP клиента
 */
export async function activate(context: vscode.ExtensionContext) {
	// Путь к твоему бинарнику. Проверь, что он реально лежит в modules/lsp.exe
	const serverPath = context.asAbsolutePath(path.join('modules', 'lsp.exe'));

	const serverOptions: ServerOptions = {
		run: { command: serverPath },
		debug: { command: serverPath },
	};

	const clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'lacon' }],
		synchronize: {
			fileEvents: vscode.workspace.createFileSystemWatcher('**/*.lacon'),
		},
	};

	client = new LanguageClient('laconLSP', 'LaCoN Language Server', serverOptions, clientOptions);

	// Запускаем сервер
	await client.start();
}

/**
 * Та самая функция для отправки строки извне (из extension.ts)
 * @param content - Строка, которую нужно прокинуть в Rust
 */
export async function sendStringToLsp(content: string): Promise<any> {
	if (!client || !client.isRunning()) {
		throw new Error('LSP клиент не запущен. Сначала вызови activate().');
	}

	try {
		// Отправляем запрос с методом 'lacon/parseRaw'
		// В Rust этот запрос прилетит в stdin как JSON-RPC
		const result = await client.sendRequest('lacon/parseRaw', {
			content: content,
		});
		return result;
	} catch (err) {
		console.error('Ошибка при общении с LSP:', err);
		return null;
	}
}

/**
 * Остановка клиента при выключении расширения
 */
export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
