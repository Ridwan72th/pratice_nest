import { ETaskStatus } from "../task.model";

export class GetTaskFilterDto {
    status?: ETaskStatus;
    search?: string;
}