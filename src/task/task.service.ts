import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTask } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { ETaskStatus } from './task-status.enum';
import { v4 as uuid } from "uuid"
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/put-task.dto';


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

    async getTaskWithFilter(filterDto: GetTaskFilterDto) {
        const { status, search } = filterDto

        const query = this.tasksRepository.createQueryBuilder("task")

        if (status) {
            query.andWhere("task.status = :status", { status })
        }

        const task = await query.getMany()
        return task
    }

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

    async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const { title, description, status } = updateTaskDto
        const found = await this.getTaskById(id)
        found.title = title;
        found.description = description;
        found.status = status;
        await this.tasksRepository.save(found)
        return found
    }

    async deleteTask(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id)
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`)
        }

    }
}