import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ETaskStatus } from "./task.model";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    status: ETaskStatus
}