import {GenericService} from "./generic/generic.service";
import {Skill} from "../entities/skill.entity";
import {Repository} from "typeorm";

export class SkillService extends GenericService<Skill> {
    constructor(
        skillRepository: Repository<Skill>
    ) {
        super(skillRepository);
    }
}