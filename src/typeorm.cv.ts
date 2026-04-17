import {AppContainer} from "./app.container";

export const Cv = {
    user: async (parent) => {
        return await AppContainer.userService.findByCvId(parent.id);
    },
    skills: async (parent) => {
        return await AppContainer.skillService.findByCvId(parent.id);
    }
}