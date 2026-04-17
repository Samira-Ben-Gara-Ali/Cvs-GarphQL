import {pubSub} from "./main";

export const Subscription = {
    cv: {
        subscribe: (parent, args, { db }) =>
            pubSub.subscribe("cv"),
        resolve: (payload) => payload,
    }
};