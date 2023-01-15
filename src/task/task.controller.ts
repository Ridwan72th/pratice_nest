import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { ITask } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Get()
    getTask(@Query() filterDto: GetTaskFilterDto): ITask[] {
        if (Object.keys(filterDto).length) {
            return this.taskService.getTaskWithFilter(filterDto)
        }
        return this.taskService.getAllTask()
    }
}
