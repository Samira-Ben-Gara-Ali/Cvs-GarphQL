import {AppContainer} from "./app.container";

export const User = {
    cvs: async (parent) => {
        return AppContainer.cvService.findByUserId(parent.id);
    }
}