import * as vscode from 'vscode';
import * as path from 'path';

export const editorContext = (
    callback: (editor: vscode.TextEditor, selection: vscode.Selection, original: string, text: string) => any,
) => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const selection = editor.selection;
        const original = editor.document.getText();
        const text = editor.document.getText(selection);

        return callback(editor, selection, original, text);
    }
};

export const showInputBox = (
    defaultValue: vscode.InputBoxOptions['value'],
    placeHolder: vscode.InputBoxOptions['placeHolder'],
) =>
    vscode.window.showInputBox({
        value: defaultValue,
        placeHolder,
    });

export const camelCase = (string: string) => {
    return string
        .toLowerCase()
        .trim()
        .split(/[.\-_\s]/g)
        .reduce((string, word) => string + word[0].toUpperCase() + word.slice(1));
};

export const getFilePath = () => {
    const activeEditor = vscode.window.activeTextEditor;
    const document = activeEditor && activeEditor.document;

    return document && document.fileName;
};

export const getNewFileName = (fileName: string, type: 'tsx' | 'ts') => {
    const ext = path.extname(fileName).replace(/^\./, '');
    const extNameRegex = new RegExp(`${ext}$`);
    return fileName.replace(extNameRegex, type);
};

export const isJsx = (content: string) => {
    const reg = /<([A-z])/gm;

    return reg.test(content);
};
