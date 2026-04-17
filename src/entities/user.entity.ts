import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TimeStampEntity} from "./generic/TimeStampEntity";
import {Cv} from "./cv.entity";
import {Role} from "./role.entity";

@Entity("user")
export class User extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        length: 50,
        unique: true,
    })
    username: string;
    @Column({
        length: 50,
        unique: true,
    })
    email: string;
    @Column({
        select: false,
    })
    password: string;
    @OneToMany(() => Cv, (cv) => cv.user, {
        cascade: true,
        eager: false,
    })
    cvs: Cv[];

    @ManyToMany(() => Role, (role) => role.users, {
        cascade: true,
    })
    @JoinTable()
    roles: Role[];
}
