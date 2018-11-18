// var Base64 = require('js-base64').Base64;
var fs = require('fs');

import tl = require('azure-pipelines-task-lib/task');


var GitHubApi = require('./github-api.js');
import path = require('path');

function base64_encode(file: string): string {
    var data = fs.readFileSync(file);
	tl.debug("file length = " + data.length);
    return new Buffer(data).toString('base64');
}

async function run() {
    // try {
        var iMessage: string    = tl.getInput('Message', false);
        var iRepo: string       = tl.getInput('Repo', true);
        var iUserName: string   = tl.getInput('UserName', true);
        var iToken: string      = tl.getInput('Token', true);
        var iRemoteFile: string = tl.getInput('RemoteFile', true);
        var iLocalFile: string  = tl.getInput('LocalFile', true);
        var iAction: string     = tl.getInput('Action', true);
		if (!iMessage || iMessage == '') {
			iMessage = 'commit from task';
		}
		
		
		var content: string = base64_encode(iLocalFile);
		// var bodyObj = {"message": iMessage, "content": content};
		
		// var body: string = JSON.stringify(bodyObj);
		
        // console.log(body);
		var api = new GitHubApi(iToken, iUserName, iRepo, iRemoteFile, content, iMessage);
		switch (iAction) {
			case 'c': api.createFile(); break;
			case 'u': api.updateFile(true); break;
			case 'cu': api.updateFile(false); break;
			default: tl.setResult(tl.TaskResult.Failed, 'Action not choose.'); break;
		}
    // } catch (err) {
        // tl.setResult(tl.TaskResult.Failed, err.message);
    // }
}

run();