import {Repository} from "typeorm";
import {User} from "../entities/user.entity";
import {GenericService} from "./generic/generic.service";

export class UserService extends GenericService<User> {
    constructor(
        userRepository: Repository<User>
    ) {
        super(userRepository);
    }

    async findAllWithRoles(): Promise<User[]> {
        return this.repository.find({
            relations: ['roles'],
        });
    }

    async findByRoleId(roleId: number): Promise<User[]> {
        return await this.repository
            .createQueryBuilder("user")
            .innerJoin("user.roles", "role", "role.id = :roleId", { roleId })
            .getMany();
    }

    async findByCvId() {
        return await this.repository.find({})
    }
}