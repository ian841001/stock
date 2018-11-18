"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// var Base64 = require('js-base64').Base64;
var fs = require('fs');
const tl = require("azure-pipelines-task-lib/task");
var GitHubApi = require('./github-api.js');
function base64_encode(file) {
    var data = fs.readFileSync(file);
    tl.debug("file length = " + data.length);
    return new Buffer(data).toString('base64');
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        // try {
        var iMessage = tl.getInput('Message', false);
        var iRepo = tl.getInput('Repo', true);
        var iUserName = tl.getInput('UserName', true);
        var iToken = tl.getInput('Token', true);
        var iRemoteFile = tl.getInput('RemoteFile', true);
        var iLocalFile = tl.getInput('LocalFile', true);
        var iAction = tl.getInput('Action', true);
        if (!iMessage || iMessage == '') {
            iMessage = 'commit from task';
        }
        var content = base64_encode(iLocalFile);
        // var bodyObj = {"message": iMessage, "content": content};
        // var body: string = JSON.stringify(bodyObj);
        // console.log(body);
        var api = new GitHubApi(iToken, iUserName, iRepo, iRemoteFile, content, iMessage);
        switch (iAction) {
            case 'c':
                api.createFile();
                break;
            case 'u':
                api.updateFile(true);
                break;
            case 'cu':
                api.updateFile(false);
                break;
            default:
                tl.setResult(tl.TaskResult.Failed, 'Action not choose.');
                break;
        }
        // } catch (err) {
        // tl.setResult(tl.TaskResult.Failed, err.message);
        // }
    });
}
run();
