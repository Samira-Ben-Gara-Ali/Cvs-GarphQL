import {AppContainer} from "./app.container";

export const User = {
    roles: async (parent) => {
        return AppContainer.roleService.findByUserId(parent.id);
    },
    cvs: async (parent) => {
        return AppContainer.cvService.findByUserId(parent.id);
    }
}