import * as vscode from 'vscode';

export const replaceSelection = (
  editor: vscode.TextEditor,
  selection: vscode.Selection,
  newText: string
) => {
  editor.edit((editBuilder) => editBuilder.replace(selection, newText));
};
