import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "notionify" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'notionify.addLink',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const clipboardText = await vscode.env.clipboard.readText();
        const selection = editor.selection;

        if (selection.isEmpty || !clipboardText.startsWith('http')) {
          editor.edit((editBuilder) => {
            editBuilder.replace(selection, clipboardText);
          });
          return;
        }

        if (clipboardText.startsWith('http')) {
          const document = editor.document;

          const selectedText = document.getText(selection);
          const selectedTextWithHyperlink = `[${selectedText}](${clipboardText})`;

          editor.edit((editBuilder) => {
            editBuilder.replace(selection, selectedTextWithHyperlink);
          });
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
