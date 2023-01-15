import { ETaskStatus } from "../task.model";
import { IsEnum, IsNotEmpty } from "class-validator"


export class UpdateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsEnum(ETaskStatus)
    status: ETaskStatus;
}