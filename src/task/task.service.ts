import { Get, Injectable } from '@nestjs/common';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { ETaskStatus, ITask } from './task.model';

@Injectable()
export class TaskService {
    private task: ITask[] = [{ id: "1x", title: "test", description: "desc", status: ETaskStatus.OPEN }];

    getAllTask(): ITask[] {
        return this.task
    }

    getTaskWithFilter(filterDto: GetTaskFilterDto) {
        const { status, search } = filterDto
        let task = this.getAllTask()
        if (status) {
            task = task.filter((item) => item.status === status)

        }
        if (search) {
            task = task.filter((item) =>
                item.title.includes(search) || item.description.includes(search))
        }

        return task
    }
}