import { prisma } from "../prisma.client";
import { GraphQLError } from "graphql";
import { Role } from "@prisma/client";

export class UserService {
    findAll() {
        return prisma.user.findMany();
    }

    async findOne(id: number) {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) throw new GraphQLError("User not found");
        return user;
    }

    add(input: { username: string; email: string; password: string; role?: Role }) {
        return prisma.user.create({
            data: {
                ...input,
                role: input.role ?? Role.USER, // ← default to USER
            }
        });
    }

    async update(id: number, input: Partial<{ username: string; email: string; password: string; role: Role }>) {
        await this.findOne(id);
        return prisma.user.update({ where: { id }, data: input });
    }

    async delete(id: number) {
        await this.findOne(id);
        return prisma.user.delete({ where: { id } });
    }

    findByCvId(cvId: number) {
        return prisma.user.findFirst({
            where: { cvs: { some: { id: cvId } } },
        });
    }
}