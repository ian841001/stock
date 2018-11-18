"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const https = require('https');
var request = require('sync-request');
const tl = require("azure-pipelines-task-lib/task");
const url = require("url");
module.exports = class GitHubApi {
    constructor(token, userName, repo, path, content, message) {
        this.host = 'api.github.com';
        this.token = token;
        this.userName = userName;
        this.repo = repo;
        this.url = url.format({
            protocol: 'https',
            hostname: this.host,
            pathname: path.join('repo', this.userName, this.repo, 'cintents', path),
        }).toString();
        this.content = content;
        this.message = message;
    }
    httpReq(method, jsonBody) {
        // prepare the header
        var headers = {
            'Authorization': ('Bearer ' + this.token),
            'User-Agent': 'Awesome-Octocat-App'
        };
        var options = {
            'headers': headers,
        };
        if (jsonBody) {
            options.json = jsonBody;
        }
        tl.debug('=====GitHubApi==httpReq=====');
        tl.debug('=====options=====');
        tl.debug(options);
        tl.debug('=====options=====');
        tl.debug(options);
        tl.debug('=====options=====');
        tl.debug(options);
        tl.debug('=====GitHubApi==httpReq=====');
        var res = request(method, this.url, options);
        return res;
    }
    getFile() {
        var res = this.httpReq('GET', null);
        return res.statusCode < 300 ? JSON.parse(res.body.toString()) : null;
    }
    createOrUpdateFile(sha) {
        var json = { "message": this.message, "content": this.content };
        if (sha) {
            json.sha = sha;
        }
        console.log(sha);
        return this.httpReq('PUT', json).statusCode < 300;
    }
    createFile() {
        return this.createOrUpdateFile();
    }
    updateFile(sha) {
        return this.createOrUpdateFile(sha);
        // var res = this.getFile();
        // if (res) {
        // return this.createOrUpdateFile(res.sha);
        // } else if(forceUpdate) {
        // return false;
        // } else {
        // return this.createFile();
        // }
    }
};
