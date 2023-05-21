export type RepoUrl = URL;

export function createRepoUrl(url: string) {
	if (!url) {
		return;
	}

	try {
		const parsedUrl = new URL(url);

		return parsedUrl.host === 'github.com' ? parsedUrl : undefined;
	} catch (error: unknown) {
		console.warn(`could not parse ${url}: ${error}`);
	}
}
