import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {TimeStampEntity} from "./generic/TimeStampEntity";

@Entity("role")
export class Role extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
}