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

    async findUser(id: number) {
        return await this.repository
            .createQueryBuilder("cv")
            .where("cv.user.id = :userId", { id })
            .select("cv.user")
            .getOne();
    }
}