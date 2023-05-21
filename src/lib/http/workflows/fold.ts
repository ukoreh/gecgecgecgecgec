import type { RepoUrl, WorkflowInit, WorkflowJob, WorkflowRunUrl } from '@models';
import type { Workflows } from './interface';
import { repoUrlHeader, type FoldClient } from '../client';

export class FolderWorkflowsImpl implements Workflows {
	public constructor(private readonly workerClient: FoldClient) {}

	async trigger(url: RepoUrl): Promise<WorkflowInit | Response> {
		console.info(`triggering deploy of repo with url = ${url}`);

		const headers = new Headers();
		headers.set(repoUrlHeader, url.toString());

		const response = await this.workerClient.get('/', undefined, headers);
		const json = await response.json();

		console.log(json);
		console.log();

		if (response.ok) {
			return <WorkflowInit>{
				...json
			};
		}

		return response;
	}

	async status(url: WorkflowRunUrl): Promise<WorkflowJob | Response> {
		console.info(`getting status of workflow with url = ${url}`);

		const response = await fetch('https://relay-worker.bolinhas-hihi.workers.dev', {
			headers: {
				'x-relay-url': url
			}
		});

		if (response.ok) {
			const json = await response.json();

			return <WorkflowJob>{
				...json.jobs[0]
			};
		}

		return response;
	}
}
