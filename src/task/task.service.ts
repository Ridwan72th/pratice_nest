import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTask } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { ETaskStatus } from './task-status.enum';
import { v4 as uuid } from "uuid"
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';


@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task)
        private tasksRepository: TaskRepository,) { }
    // private task: ITask[] = [{ id: "1x", title: "test", description: "desc", status: ETaskStatus.OPEN }];

    async getAllTask(): Promise<Task[]> {
        const allTask = await this.tasksRepository.find()
        return allTask
    }

    // getTaskWithFilter(filterDto: GetTaskFilterDto) {
    //     const { status, search } = filterDto
    //     let task = this.getAllTask()
    //     if (status) {
    //         task = task.filter((item) => item.status === status)
    //     }
    //     if (search) {
    //         task = task.filter((item) =>
    //             item.title.includes(search) || item.description.includes(search))
    //     }

    //     return task
    // }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne({
            where: { id: id }
        })
        if (!found) {
            throw new NotFoundException(`task id: ${id} not found`)
        }
        return found
    }
    // getTaskById(id: string): ITask {
    //     const found = this.task.find((item) => item.id === id)
    //     if (!found) {
    //         throw new NotFoundException(`task id: ${id} not found`)
    //     }
    //     return found

    // }

    async createTask(createTask: CreateTask): Promise<Task> {
        const { title, description } = createTask;
        const newTask = this.tasksRepository.create({ title: title, description: description, status: ETaskStatus.OPEN });
        await this.tasksRepository.save(newTask)
        return newTask
    }

    // createTask(createTask: CreateTask) {
    //     const newTask = { id: uuid(), status: ETaskStatus.OPEN, ...createTask, }
    //     this.task.push(newTask)
    //     return newTask
    // }

    // updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    //     const { title, description, status } = updateTaskDto
    //     const found = this.getTaskById(id)
    //     found.title = title;
    //     found.description = description;
    //     found.status = status;
    //     return found
    // }

    async deleteTask(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id)
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`)
        }

    }
}