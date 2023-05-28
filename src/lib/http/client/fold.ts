import { FetchClient } from './client';

const baseUrl = new URL('https://fold.joaomagfreitas.workers.dev');

export const repoUrlHeader = 'x-repo-url';
export const downloadLogsHeader = 'x-download-logs';
export const jobIdHeader = 'x-job-id';

export class FoldClient extends FetchClient {
	constructor() {
		super(baseUrl);
	}
}
