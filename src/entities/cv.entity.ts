import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TimeStampEntity} from "./generic/TimeStampEntity";
import {User} from "./user.entity";
import {Skill} from "./skill.entity";

@Entity("cv")
export class Cv extends TimeStampEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        length: 50,
    })
    name: string;

    @Column({
        length: 50,
    })
    firstname: string;
    @Column()
    age: number;
    @Column({
        unique: false,
    })
    cin: number;
    @Column()
    job: string;
    @Column({ nullable: true })
    path: string;
    @ManyToOne(() => User, (user) => user.cvs, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    user: User;
    @ManyToMany(() => Skill, (skill) => skill.cvs, {
        eager: false,
        cascade: false,
    })
    @JoinTable({
        name: 'cv_skills',
        joinColumn: {
            name: 'cv_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'skill_id',
            referencedColumnName: 'id',
        },
    })
    skills: Skill[];
}
