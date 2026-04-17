import {AppContainer} from "./app.container";

export const Skill = {
    cvs: async (parent) => {
        return await AppContainer.cvService.findBySkillId(parent.id);
    }
}