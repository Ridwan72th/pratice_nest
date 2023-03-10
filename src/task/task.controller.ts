import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateTask } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskDto } from './dto/put-task.dto';
import { Task } from './task.entity';
// import { ITask } from './task-status.enum';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Get()
    getTask(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
        if (Object.keys(filterDto).length) {
            return this.taskService.getTaskWithFilter(filterDto)
        }
        return this.taskService.getAllTask()
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTaskById(id)
    }
    // @Get('/:id')
    // getTaskById(@Param('id') id: string): ITask {
    //     return this.taskService.getTaskById(id)
    // }

    @Post()
    createTask(@Body() createTask: CreateTask): Promise<Task> {
        return this.taskService.createTask(createTask)

    }

    // @Post()
    // createTask(@Body() createTask: CreateTask): ITask {
    //     return this.taskService.createTask(createTask)
    // }

    @Put('/:id')
    updateTask(@Body() updateTaskDto: UpdateTaskDto, @Param('id') id: string): Promise<Task> {
        return this.taskService.updateTask(id, updateTaskDto)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<void> {
        return this.taskService.deleteTask(id)
    }
}
