import * as vscode from 'vscode';
import * as l10n from '@vscode/l10n';

export async function initializeLocalization(context: vscode.ExtensionContext): Promise<void> {
	const locale = vscode.env.language;
	const l10nDir = vscode.Uri.joinPath(context.extensionUri, 'l10n');
	let l10nFile = vscode.Uri.joinPath(l10nDir, 'bundle.l10n.json');

	if (locale !== 'en') {
		const specificFile = vscode.Uri.joinPath(l10nDir, `bundle.l10n.${locale}.json`);
		try {
			await vscode.workspace.fs.stat(specificFile);
			l10nFile = specificFile;
		} catch {
			console.log(`Localization for "${locale}" not found, falling back to English.`);
		}
	}

	try {
		await l10n.config({ uri: l10nFile.toString() });
	} catch (e) {
		console.error('Critical error loading l10n:', e);
	}
}
