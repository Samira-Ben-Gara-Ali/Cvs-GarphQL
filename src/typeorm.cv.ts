import {AppContainer} from "./app.container";

export const Cv = {
    user: async (parent) => {
        return await AppContainer.cvService.findUser(parent.id);
    }
}