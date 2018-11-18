// const https = require('https');
var request = require('sync-request');
import {Response} from 'then-request';
import tl = require('azure-pipelines-task-lib/task');
import url = require('url');
import path = require('path');

module.exports = class GitHubApi {
	private host: string = 'api.github.com';
	
	private token: string;
	private userName: string;
	private repo: string;
	private url: string;
	private content: string;
	private message: string;
	
	public constructor(token: string, userName: string, repo: string, path: string, content: string, message: string) {
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
	private httpReq(method: string, jsonBody: any): Response {
		// prepare the header
		var headers: {[index:string] : string} = {
			'Authorization' : ('Bearer ' + this.token),
			'User-Agent' : 'Awesome-Octocat-App'
		};

		var options: {[index:string] : any} = {
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
	
	public getFile() {
		var res = this.httpReq('GET', null);
		return res.statusCode < 300 ? JSON.parse(res.body.toString()) : null;
	}
	private createOrUpdateFile(sha?: string): boolean {
		var json: {[index:string] : any} = {"message": this.message, "content": this.content};
		if (sha) {
			json.sha = sha;
		}
		console.log(sha);
		return this.httpReq('PUT', json).statusCode < 300;
	}
	public createFile(): boolean {
		return this.createOrUpdateFile();
	}
	public updateFile(sha: string): boolean {
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
	

}