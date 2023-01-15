import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateTask } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskDto } from './dto/put-task.dto';
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

    @Get('/:id')
    getTaskById(@Param('id') id: string): ITask {
        return this.taskService.getTaskById(id)
    }

    @Post()
    createTask(@Body() createTask: CreateTask): ITask {
        return this.taskService.createTask(createTask)
    }

    @Put('/:id')
    updateTask(@Body() updateTaskDto: UpdateTaskDto, @Param('id') id: string): ITask {
        return this.taskService.updateTask(id, updateTaskDto)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.taskService.deleteTask(id)
    }
}
