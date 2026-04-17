import { AppContainer } from "./app.container";
import { GraphQLError } from "graphql";

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
        return AppContainer.userService.delete(id);
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
        return AppContainer.roleService.delete(id);
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
        return AppContainer.skillService.delete(id);
    },

    // --- CV ---
    addCv: async (_parent, { input }) => {
        return AppContainer.cvService.add(input);
    },
    updateCv: async (_parent, { input }) => {
        const { id, ...fields } = input;
        const existing = await AppContainer.cvService.findOne(Number(id));
        return AppContainer.cvService.update({ ...existing, ...fields });
    },
    deleteCv: async (_parent, { id }) => {
        return AppContainer.cvService.delete(id);
    },
};