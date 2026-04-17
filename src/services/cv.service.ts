import {GenericService} from "./generic/generic.service";
import {Cv} from "../entities/cv.entity";
import {User} from "../entities/user.entity";
import {Skill} from "../entities/skill.entity";
import {Repository} from "typeorm";
import {GraphQLError} from "graphql";

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

    // cv.service.ts
    async findOneWithRelations(id: number): Promise<Cv> {
        const cv = await this.repository.findOne({
            where: { id },
            relations: ["user", "skills"],
        });
        if (!cv) throw new GraphQLError("CV not found");
        return cv;
    }

    async updateCv(id: number, fields: Partial<Cv>, user: User, skills: Skill[]): Promise<Cv> {
        const existing = await this.findOneWithRelations(id);
        const updated = this.repository.create({
            ...existing,
            ...fields,
            user,
            skills,
        });
        return await this.repository.save(updated);
    }
}