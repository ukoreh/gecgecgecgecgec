import { FetchClient } from './client';

const baseUrl = new URL('https://fold.rutesantos4.workers.dev');

export const repoUrlHeader = 'x-repo-url';

export class FoldClient extends FetchClient {
	constructor() {
		super(baseUrl);
	}
}
