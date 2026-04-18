import {pubSub} from "./main";

export const Subscription = {
    cv: {
        subscribe: (_, __, { }) =>
            pubSub.subscribe("cv"),

        resolve: (payload) => payload,
    }
};