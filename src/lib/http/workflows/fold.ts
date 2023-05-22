import { right, type Either, type RepoUrl, type WorkflowInit, type WorkflowInitFailure, type WorkflowJob, type WorkflowRunUrl, type WorkflowStatusFailure, left } from '@models';
import type { Workflows } from './interface';
import { repoUrlHeader, type FoldClient } from '../client';

export class FolderWorkflowsImpl implements Workflows {
	public constructor(private readonly workerClient: FoldClient) { }

	async trigger(url: RepoUrl): Promise<Either<WorkflowInitFailure, WorkflowInit>> {
		console.info(`triggering deploy of repo with url = ${url}`);

		const headers = new Headers();
		headers.set(repoUrlHeader, url.toString());

		const response = await this.workerClient.get('/', undefined, headers);
		const json = await response.json();

		if (response.ok) {
			return right<WorkflowInit>(
				{
					...json
				}
			)
		};

		return left<WorkflowInitFailure>(
			{
				...json,
			}
		);
	}

	async status(url: WorkflowRunUrl): Promise<Either<WorkflowStatusFailure, WorkflowJob>> {
		console.info(`getting status of workflow with url = ${url}`);

		const response = await fetch('https://relay-worker.bolinhas-hihi.workers.dev', {
			headers: {
				'x-relay-url': url
			}
		});

		if (response.ok) {
			const json = await response.json();

			return right<WorkflowJob>(
				{
					...json.jobs[0]
				}
			);
		}

		return left<WorkflowStatusFailure>(
			{
				status: response.status,
			}
		);
	}
}
