import {GenericService} from "./generic/generic.service";
import {Role} from "../entities/role.entity";
import {Repository} from "typeorm";

export class RoleService extends GenericService<Role> {
    constructor(
        roleRepository: Repository<Role>
    ) {
        super(roleRepository);
    }

    async findAllWithUsers(): Promise<Role[]> {
        return this.repository.find({
            relations: ['users'],
        });
    }

    async findByUserId(userId: string): Promise<Role[]> {
        return await this.repository
            .createQueryBuilder("role")
            .innerJoin("role.users", "user", "user.id = :userId", { userId })
            .getMany();
    }
}