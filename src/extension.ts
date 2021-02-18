import * as vscode from 'vscode';
import { replaceSelection } from './utils';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "notionify" is now active!');

  let disposable = vscode.commands.registerCommand(
    'notionify.addLink',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const clipboardText = await vscode.env.clipboard.readText();
        const selection = editor.selection;

        if (selection.isEmpty || !clipboardText.startsWith('http')) {
          replaceSelection(editor, selection, clipboardText);
          return;
        }

        if (clipboardText.startsWith('http')) {
          const document = editor.document;
          const selectedText = document.getText(selection);
          const selectedTextWithHyperlink = `[${selectedText}](${clipboardText})`;
          replaceSelection(editor, selection, selectedTextWithHyperlink);
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
