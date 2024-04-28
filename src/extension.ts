import * as vscode from "vscode";
import hasbin from "hasbin";
import {
	LanguageClient,
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(_: vscode.ExtensionContext) {
	hasbin.first(["wgsl-lsp"], (res) => {
		if (res) {

			client = new LanguageClient(
				"wgsl",
				"WGSL",
				{ command: "wgsl-lsp" },
				{
					documentSelector: [
						{ scheme: "file", language: "wgsl" }
					],
					synchronize: {
						fileEvents: vscode.workspace.createFileSystemWatcher("**/*.wgsl")
					},
					initializationOptions: {
						// todo: add config options
					}
				}
			);

			client.start();

			// todo: respect config settings & commands
			//if (config.get("wgsl.autocompleate") == true) {
			//if (config.get("wgsl.validateOnSave") == true)
			//if (config.get("wgsl.validateOnType") == true)
			//vscode.commands.registerCommand("wgsl.validateFile", () => {
		}
	});
}

export function deactivate() {
	if (client) {
		return client.stop();
	}
}
