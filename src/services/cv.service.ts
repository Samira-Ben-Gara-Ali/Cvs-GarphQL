import { prisma } from "../prisma.client";
import { GraphQLError } from "graphql";

export class CvService {
    findAll() {
        return prisma.cv.findMany();
    }

    async findOne(id: number) {
        const cv = await prisma.cv.findUnique({ where: { id } });
        if (!cv) throw new GraphQLError("CV not found");
        return cv;
    }

    async findOneWithRelations(id: number) {
        const cv = await prisma.cv.findUnique({
            where: { id },
            include: { user: true, skills: true },
        });
        if (!cv) throw new GraphQLError("CV not found");
        return cv;
    }

    add(input: {
        name: string; firstname: string; age: number;
        cin: number; job: string; path?: string;
        userId: number; skillIds: number[];
    }) {
        const { skillIds, ...fields } = input;
        return prisma.cv.create({
            data: {
                ...fields,
                skills: { connect: skillIds.map(id => ({ id })) },
            },
        });
    }

    async update(id: number, input: {
        name?: string; firstname?: string; age?: number;
        cin?: number; job?: string; path?: string;
        userId?: number; skillIds?: number[];
    }) {
        await this.findOne(id);
        const { skillIds, ...fields } = input;
        return prisma.cv.update({
            where: { id },
            data: {
                ...fields,
                ...(skillIds && {
                    skills: { set: skillIds.map(id => ({ id })) },
                }),
            },
        });
    }

    async delete(id: number) {
        await this.findOne(id);
        return prisma.cv.delete({ where: { id } });
    }

    findByUserId(userId: number) {
        return prisma.cv.findMany({ where: { userId } });
    }

    findBySkillId(skillId: number) {
        return prisma.cv.findMany({
            where: { skills: { some: { id: skillId } } },
        });
    }
}