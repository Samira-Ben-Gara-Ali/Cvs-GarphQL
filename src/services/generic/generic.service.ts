import {TimeStampEntity} from "../../entities/generic/TimeStampEntity";
import {Repository} from "typeorm";
import {GraphQLError} from "graphql";

export class GenericService<T extends TimeStampEntity & { id: number }> {
    constructor(
        protected readonly repository: Repository<T>
    ) {}

    findAll() {
        return this.repository.find();
    }

    async findOne(id: number) {
        const entity = await this.repository.findOne({
            where: { id } as any,
        });

        return entity;
    }

    async add(entity: T): Promise<T> {
        return await this.repository.save(entity);
    }

    async delete(id: number): Promise<T> {
        const entity = await this.repository.findOne({
            where: { id } as any,
        });

        if (!entity) {
            throw new GraphQLError('entity does not exist');
        }

        await this.repository.delete(id);
        return entity;
    }

    async update(entity: T): Promise<T> {
        const ent = await this.repository.find({
            where: { id: entity.id } as any,
        });

        if (!ent) {
            throw new GraphQLError('entity does not exist');
        }

        return await this.repository.save(entity);
    }
}