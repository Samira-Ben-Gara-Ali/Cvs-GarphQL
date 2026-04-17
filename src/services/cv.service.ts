import {GenericService} from "./generic/generic.service";
import {Cv} from "../entities/cv.entity";
import {Repository} from "typeorm";

export class CvService extends GenericService<Cv> {
    constructor(
        cvRepository: Repository<Cv>
    ) {
        super(cvRepository);
    }

    async findByUserId(userId: number): Promise<Cv[]> {
        return await this.repository
            .createQueryBuilder("cv")
            .where("cv.user.id = :userId", { userId })
            .getMany();
    }

    async findBySkillId(skillId: number): Promise<Cv[]> {
        return this.repository
            .createQueryBuilder("cv")
            .innerJoin("cv.skills", "skill", "skill.id = :skillId", { skillId })
            .getMany();
    }
}