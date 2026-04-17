import { GraphQLError } from "graphql";

export const Query = {

    users: (parent, args, { db }, info) => db.users,

    user: (parent, { id }, { db }, info) => {
        const user = db.users.find((user) => user.id === id);

        if (!user) {
            throw new GraphQLError(`User with id '${id}' not found.`, {
                extensions: {
                    http: { status: 404 },
                },
            });
        }

        return user;
    },

    cvs: (parent, args, { db }, info) => db.cvs,

    cv: (parent, { id }, { db }, info) => {
        const cv = db.cvs.find((c) => c.id === id);

        if (!cv) {
            throw new GraphQLError(`CV with id '${id}' not found.`, {
                extensions: {
                    http: { status: 404 },
                },
            });
        }

        return cv;
    },

    skills: (parent, args, { db }, info) => db.skills,

    skill: (parent, { id }, { db }, info) => {
        const skill = db.skills.find((s) => s.id === id);

        if (!skill) {
            throw new GraphQLError(`Skill with id '${id}' not found.`, {
                extensions: {
                    http: { status: 404 },
                },
            });
        }

        return skill;
    }
};