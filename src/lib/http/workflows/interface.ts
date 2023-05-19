import type { WorkflowJob, WorkflowRunId } from "@models";

export interface Workflows {
    status(id: WorkflowRunId): Promise<WorkflowJob | Response>;
}