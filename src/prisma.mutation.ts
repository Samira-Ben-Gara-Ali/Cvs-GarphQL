import { AppContainer } from "./app.container";
import { pubSub } from "./pubSub";
import { GraphQLError } from "graphql";

export const Mutation = {
    // --- User ---
    addUser: async (_parent, { input }) => {
        return AppContainer.userService.add(input);
    },
    updateUser: async (_parent, { input }) => {
        const { id, ...fields } = input;
        return AppContainer.userService.update(Number(id), fields); // ← (id, fields) not merged object
    },
    deleteUser: async (_parent, { id }) => {
        return AppContainer.userService.delete(Number(id));
    },

    // --- Skill ---
    addSkill: async (_parent, { input }) => {
        return AppContainer.skillService.add(input);
    },
    updateSkill: async (_parent, { input }) => {
        const { id, ...fields } = input;
        return AppContainer.skillService.update(Number(id), fields); // ← same fix
    },
    deleteSkill: async (_parent, { id }) => {
        return AppContainer.skillService.delete(Number(id));
    },

    // --- CV ---
    addCv: async (_parent, { input }) => {
        const { userId, skillIds, ...cvFields } = input;

        await AppContainer.userService.findOne(Number(userId));   // verify exists
        await Promise.all(                                         // verify all skills exist
            skillIds.map((id: string) =>
                AppContainer.skillService.findOne(Number(id))
            )
        );

        const cv = await AppContainer.cvService.add({
            ...cvFields,
            userId: Number(userId),
            skillIds: skillIds.map(Number),
        });

        // fetch with relations for the pubSub payload
        const full = await AppContainer.cvService.findOneWithRelations(cv.id);
        pubSub.publish("CV_CHANGED", { mutationType: "ADDED", cv: full });
        return cv;
    },

    updateCv: async (_parent, { input }) => {
        const { id, userId, skillIds, ...fields } = input;

        if (userId) await AppContainer.userService.findOne(Number(userId));
        if (skillIds) await Promise.all(
            skillIds.map((sid: string) =>
                AppContainer.skillService.findOne(Number(sid))
            )
        );

        const cv = await AppContainer.cvService.update(Number(id), {
            ...fields,
            ...(userId && { userId: Number(userId) }),
            ...(skillIds && { skillIds: skillIds.map(Number) }),
        });

        const full = await AppContainer.cvService.findOneWithRelations(cv.id);
        pubSub.publish("CV_CHANGED", { mutationType: "UPDATED", cv: full });
        return cv;
    },

    deleteCv: async (_parent, { id }) => {
        const full = await AppContainer.cvService.findOneWithRelations(Number(id));
        const cv = await AppContainer.cvService.delete(Number(id));
        pubSub.publish("CV_CHANGED", { mutationType: "DELETED", cv: full }); // ← use full before delete
        return cv;
    },
};