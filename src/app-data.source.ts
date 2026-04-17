import {DataSource} from "typeorm";
import {User} from "./entities/user.entity";
import {Skill} from "./entities/skill.entity";
import {Cv} from "./entities/cv.entity";
import {Role} from "./entities/role.entity";

export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as "mysql" | "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    entities: [User, Skill, Cv, Role],

    synchronize: true,
});