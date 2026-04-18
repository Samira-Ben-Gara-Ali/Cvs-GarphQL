import { GraphQLError } from "graphql";
import {prisma, pubSub} from "./main";

export const Mutation = {

    addCv: async (_, { input }, {  }) => {

        // on verifie que l user associee au cv existe vraiment dans la bd
        await validateExistPrisma(
            prisma.user,
            "id",
            Number(input.userId),
            "user inexistant !"
        );
        // on verifie que les skills existent en bd
        await validateExistPrisma(
            prisma.skill,
            "id",
            input.skillIds.map(id => Number(id)),
            "skills invalides !"
        );

        const newCv = await prisma.cv.create({
            data: {
                name: input.name,
                age: input.age,
                job: input.job,
                user: {
                    // ici on va lier le cv a l user indiquee via foreign key : user existant bien sur
                    connect: { id: Number(input.userId) }
                },
                skills: {
                    // prisma va lier le cv a skills en remplissant la table intermediaire CvSkills
                    connect: input.skillIds.map(id => ({ id: Number(id) }))
                }
            },
            //on veut pouvoir retourner les relation aussi
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
        // on verifie que le cv existe en bd
        const existingCv = await prisma.cv.findUnique({
            where: { id: Number(id) }
        });

        if (!existingCv) {
            throw new GraphQLError(`cv avec id '${id}' inexistant`);
        }

        if (input.userId) {
            await validateExistPrisma(
                prisma.user,
                "id",
                Number(input.userId),
                "user inexistant !"
            );
        }

        if (input.skillIds) {
            await validateExistPrisma(
                prisma.skill,
                "id",
                input.skillIds.map(id => Number(id)),
                "skills invalides !"
            );
        }

        const updatedCv = await prisma.cv.update({
            where: { id: Number(id) },
            data: {
                name: input.name,
                age: input.age,
                job: input.job,
                //si on met a jour l user on va executer ce bloc sinon rien
                ...(input.userId && {
                    user: {
                        connect: { id: Number(input.userId) }
                    }
                }),
                ...(input.skillIds && {
                    skills: {
                        //avec set on va pouvoir supprimer les anciens skills et mettre les nouveaux
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
async function validateExistPrisma(model, field, values, errorMessage) {

    if (!Array.isArray(values)) {
        const record = await model.findUnique({
            where: { [field]: values }
        });

        if (!record) {
            throw new GraphQLError(errorMessage);
        }
    }

    else {
        // on va compter le nombre de skills dans la bd qui sont dans le tabelau values
        const count = await model.count({
            where: {
                [field]: { in: values }
            }
        });

        if (count !== values.length) {
            throw new GraphQLError(errorMessage);
        }
    }
}