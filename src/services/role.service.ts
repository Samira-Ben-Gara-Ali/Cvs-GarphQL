import { prisma } from "../prisma.client";
import { GraphQLError } from "graphql";

export class RoleService {
    findAll() {
        return prisma.role.findMany();
    }

    async findOne(id: number) {
        const role = await prisma.role.findUnique({ where: { id } });
        if (!role) throw new GraphQLError("Role not found");
        return role;
    }

    add(input: { name: string }) {
        return prisma.role.create({ data: input });
    }

    async update(id: number, input: Partial<{ name: string }>) {
        await this.findOne(id);
        return prisma.role.update({ where: { id }, data: input });
    }

    async delete(id: number) {
        await this.findOne(id);
        return prisma.role.delete({ where: { id } });
    }

    findByUserId(userId: number) {
        return prisma.role.findMany({
            where: { users: { some: { id: userId } } },
        });
    }
}