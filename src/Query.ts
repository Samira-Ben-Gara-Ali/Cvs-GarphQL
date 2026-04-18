import { GraphQLError } from "graphql";

const findByIdOrThrow = async (model, id, entityName, include = {}) => {
    const item = await model.findUnique({
        where: { id: Number(id) },
        include
    });

    if (!item) {
        throw new GraphQLError(`${entityName} with id '${id}' not found.`, {
            extensions: {
                http: { status: 404 },
            },
        });
    }

    return item;
};

export const Query = {

    users: async (_, __, { prisma }) =>
        prisma.user.findMany({
            include: {
                cvs: {
                    include: {
                        skills: true
                    }
                }
            }
        }),

    user: async (_, { id }, { prisma }) =>
        findByIdOrThrow(prisma.user, id, "User", {
            cvs: {
                include: {
                    skills: true
                }
            }
        }),

    cvs: async (_, __, { prisma }) =>
        prisma.cv.findMany({
            include: {
                user: true,
                skills: true
            }
        }),

    cv: async (_, { id }, { prisma }) =>
        findByIdOrThrow(prisma.cv, id, "Cv", {
            user: true,
            skills: true
        }),

    skills: async (_, __, { prisma }) =>
        prisma.skill.findMany({
            include: {
                cvs: true
            }
        }),

    skill: async (_, { id }, { prisma }) =>
        findByIdOrThrow(prisma.skill, id, "Skill", {
            cvs: true
        }),
};