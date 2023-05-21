export type RepoUrl = URL;

export function createRepoUrl(url: string) {
	try {
		const parsedUrl = new URL(url);

		return parsedUrl.host === 'github.com' ? parsedUrl : undefined;
	} catch (error) {
		console.error(error);
	}
}
