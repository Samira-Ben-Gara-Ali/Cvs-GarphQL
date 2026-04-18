import {AppContainer} from "./app.container";
import {GraphQLError} from "graphql";

export const Query = {
    users: () => AppContainer.userService.findAll(),
    user: (parent, { id }, ctx, info) => {
        const user = AppContainer.userService.findOne(id);

        if (!user) {
            throw new GraphQLError("User not found");
        }

        return user;
    },
    skills: () => AppContainer.skillService.findAll(),
    skill: (parent, { id }, ctx, info) => {
        const skill = AppContainer.skillService.findOne(id);

        if (!skill) {
            throw new GraphQLError("Skill not found");
        }

        return skill;
    },
    cvs: () => AppContainer.cvService.findAll(),
    cv: (parent, { id }, ctx, info) => {
        const cv = AppContainer.cvService.findOne(id);

        if (!cv) {
            throw new GraphQLError("CV not found");
        }

        return cv;
    }
}