import { prisma } from "../prisma.client";
import { GraphQLError } from "graphql";

export class SkillService {
    findAll() {
        return prisma.skill.findMany();
    }

    async findOne(id: number) {
        const skill = await prisma.skill.findUnique({ where: { id } });
        if (!skill) throw new GraphQLError("Skill not found");
        return skill;
    }

    add(input: { designation: string }) {
        return prisma.skill.create({ data: input });
    }

    async update(id: number, input: Partial<{ designation: string }>) {
        await this.findOne(id);
        return prisma.skill.update({ where: { id }, data: input });
    }

    async delete(id: number) {
        await this.findOne(id);
        return prisma.skill.delete({ where: { id } });
    }

    findByCvId(cvId: number) {
        return prisma.skill.findMany({
            where: { cvs: { some: { id: cvId } } },
        });
    }
}