import { GraphQLError } from "graphql";
import {prisma, pubSub} from "./main";

export const Mutation = {

    addCv: async (_, { input }, {  }) => {

        const user = await prisma.user.findUnique({
            where: { id: Number(input.userId) }
        });

        if (!user) {
            throw new GraphQLError("user inexistant !");
        }

        const skills = await prisma.skill.findMany({
            where: {
                id: { in: input.skillIds.map(id => Number(id)) }
            }
        });

        if (skills.length !== input.skillIds.length) {
            throw new GraphQLError("skills invalides !");
        }

        const newCv = await prisma.cv.create({
            data: {
                name: input.name,
                age: input.age,
                job: input.job,
                user: {
                    connect: { id: Number(input.userId) }
                },
                skills: {
                    connect: input.skillIds.map(id => ({ id: Number(id) }))
                }
            },
            include: {
                user: true,
                skills: true
            }
        });

        pubSub.publish("cv", {
            cv: newCv,
            mutation: "ADD"
        });

        return newCv;
    },

    updateCv: async (_, { id, input }, {  }) => {

        const existingCv = await prisma.cv.findUnique({
            where: { id: Number(id) }
        });

        if (!existingCv) {
            throw new GraphQLError(`cv avec id '${id}' inexistant`);
        }

        if (input.userId) {
            const user = await prisma.user.findUnique({
                where: { id: Number(input.userId) }
            });

            if (!user) {
                throw new GraphQLError("user inexistant !");
            }
        }

        if (input.skillIds) {
            const skills = await prisma.skill.findMany({
                where: {
                    id: { in: input.skillIds.map(id => Number(id)) }
                }
            });

            if (skills.length !== input.skillIds.length) {
                throw new GraphQLError("skills invalides !");
            }
        }

        const updatedCv = await prisma.cv.update({
            where: { id: Number(id) },
            data: {
                name: input.name,
                age: input.age,
                job: input.job,
                ...(input.userId && {
                    user: {
                        connect: { id: Number(input.userId) }
                    }
                }),
                ...(input.skillIds && {
                    skills: {
                        set: input.skillIds.map(id => ({ id: Number(id) }))
                    }
                })
            },
            include: {
                user: true,
                skills: true
            }
        });

        pubSub.publish("cv", {
            cv: updatedCv,
            mutation: "UPDATE"
        });

        return updatedCv;
    },

    deleteCv: async (_, { id }, {  }) => {

        const existingCv = await prisma.cv.findUnique({
            where: { id: Number(id) },
            include: {
                user: true,
                skills: true
            }
        });

        if (!existingCv) {
            throw new GraphQLError(`CV with id '${id}' not found`);
        }

        await prisma.cv.delete({
            where: { id: Number(id) }
        });

        pubSub.publish("cv", {
            cv: existingCv,
            mutation: "DELETE"
        });

        return existingCv;
    }
};