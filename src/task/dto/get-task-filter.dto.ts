import { ETaskStatus } from "../task-status.enum";

export class GetTaskFilterDto {
    status?: ETaskStatus;
    search?: string;
}