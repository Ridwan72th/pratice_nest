import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTask } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { ETaskStatus, ITask } from './task.model';
import { v4 as uuid } from "uuid"
import { UpdateTaskDto } from './dto/put-task.dto';


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

    getTaskById(id: string): ITask {
        const found = this.task.find((item) => item.id === id)
        if (!found) {
            throw new NotFoundException(`task id: ${id} not found`)
        }
        return found

    }

    createTask(createTask: CreateTask) {
        const newTask = { id: uuid(), status: ETaskStatus.OPEN, ...createTask, }
        this.task.push(newTask)
        return newTask
    }

    updateTask(id: string, updateTaskDto: UpdateTaskDto) {
        const { title, description, status } = updateTaskDto
        const found = this.getTaskById(id)
        found.title = title;
        found.description = description;
        found.status = status;
        return found
    }

    deleteTask(id: string): void {
        this.task.filter((item) => item.id !== id)
    }
}