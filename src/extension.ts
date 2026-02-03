import * as vscode from 'vscode';
import { initializeLocalization } from './common/locale';
import * as laconWasm from '../modules/wasm/wasm';
// import * as lsp from './lsp/index';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
	await initializeLocalization(context);
	console.log('TEST');

	testWasm();

	// await lsp.activate(context);
	// const response = await lsp.sendStringToLsp('const test = 100Hz');
	// console.log('Rust ответил:', response);
}

export function deactivate(): void {}

function testWasm() {
	const laconCode = `
		const a<Acceleration> = 128km/s2
		someKey: "value"
		anotherKey: 123
	`;

	try {
		const tokens = laconWasm.lex(laconCode);

		console.log('Tokens:', tokens);
		console.log('Token count:', tokens.length); // Добавь это для явности

		vscode.window.showInformationMessage(`Lexed ${tokens.length} tokens`);

		tokens.forEach((token: any) => {
			console.log({
				type: token.token_type,
				lexeme: token.lexeme,
				literal: token.literal,
				position: token.position,
				flags: token.flags,
			});
		});
	} catch (error) {
		console.error('Lex error:', error); // Используй console.error
		vscode.window.showErrorMessage(`Lex error: ${error}`);
	}
}
