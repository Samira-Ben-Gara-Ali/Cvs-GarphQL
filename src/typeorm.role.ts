import {AppContainer} from "./app.container";

export const Role = {
    users: async (parent) => {
        return await AppContainer.userService.findByRoleId(parent.id);
    }
}