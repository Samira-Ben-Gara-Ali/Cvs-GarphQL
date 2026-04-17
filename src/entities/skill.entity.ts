import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Cv} from "./cv.entity";
import {TimeStampEntity} from "./generic/TimeStampEntity";

@Entity("skill")
export class Skill extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    designation: string;
    @ManyToMany(() => Cv, (cv) => cv.skills)
    cvs: Cv[];
}