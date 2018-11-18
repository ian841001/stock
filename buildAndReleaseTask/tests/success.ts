import ma = require('azure-pipelines-task-lib/mock-answer');
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

let taskPath = path.join(__dirname, '..', 'index.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tmr.setInput('Message', '');
tmr.setInput('Repo', 'stock');
tmr.setInput('UserName', 'ian841001');
tmr.setInput('Token', '44184151b7ddee56cd88a50a0929b3eac339f230');
tmr.setInput('RemotePath', '/');
tmr.setInput('FilePath', '/root/file.json');
tmr.setInput('Action', 'c');

tmr.run();