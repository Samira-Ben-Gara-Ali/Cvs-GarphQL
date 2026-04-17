import { AppContainer } from "./app.container";
import { pubSub } from "./main";
import {GraphQLError} from "graphql";

export const Mutation = {
    // --- User ---
    addUser: async (_parent, { input }) => {
        return AppContainer.userService.add(input);
    },
    updateUser: async (_parent, { input }) => {
        const { id, ...fields } = input;
        const existing = await AppContainer.userService.findOne(Number(id));
        return AppContainer.userService.update({ ...existing, ...fields });
    },
    deleteUser: async (_parent, { id }) => {
        return AppContainer.userService.delete(Number(id)); // ← cast
    },

    // --- Role ---
    addRole: async (_parent, { input }) => {
        return AppContainer.roleService.add(input);
    },
    updateRole: async (_parent, { input }) => {
        const { id, ...fields } = input;
        const existing = await AppContainer.roleService.findOne(Number(id));
        return AppContainer.roleService.update({ ...existing, ...fields });
    },
    deleteRole: async (_parent, { id }) => {
        return AppContainer.roleService.delete(Number(id)); // ← cast
    },

    // --- Skill ---
    addSkill: async (_parent, { input }) => {
        return AppContainer.skillService.add(input);
    },
    updateSkill: async (_parent, { input }) => {
        const { id, ...fields } = input;
        const existing = await AppContainer.skillService.findOne(Number(id));
        return AppContainer.skillService.update({ ...existing, ...fields });
    },
    deleteSkill: async (_parent, { id }) => {
        return AppContainer.skillService.delete(Number(id)); // ← cast
    },

    // --- CV ---
    addCv: async (_parent, { input }) => {
        const { userId, skillIds, ...cvFields } = input;
        console.log(input);

        const user = await AppContainer.userService.findOne(Number(userId));
        console.log(user);
        const skills = await Promise.all(
            skillIds.map((skillId) => AppContainer.skillService.findOne(skillId))
        );

        const cv = await AppContainer.cvService.add({ ...cvFields, user, skills });
        pubSub.publish("CV_CHANGED", { mutationType: "ADDED", cv });
        return cv;
    },

    updateCv: async (_parent, { input }) => {
        const { id, userId, skillIds, ...fields } = input;

        // load with relations so existing.user and existing.skills are not undefined
        const existing = await AppContainer.cvService.findOneWithRelations(Number(id));

        const user = userId
            ? await AppContainer.userService.findOne(Number(userId))
            : existing.user;

        if (!user) {
            throw new GraphQLError("user not found");
        }

        const skills = skillIds
            ? await Promise.all(
                skillIds.map((sid: string) =>
                    AppContainer.skillService.findOne(Number(sid))
                )
            )
            : existing.skills;

        const cv = await AppContainer.cvService.updateCv(Number(id), fields, user, skills);
        pubSub.publish("CV_CHANGED", { mutationType: "UPDATED", cv });
        return cv;
    },

    deleteCv: async (_parent, { id }) => {
        const cv = await AppContainer.cvService.delete(Number(id)); // ← cast
        pubSub.publish("CV_CHANGED", { mutationType: "DELETED", cv });
        return cv;
    },
};