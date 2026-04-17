import {pubSub} from "./main";

export const Subscription = {
    newCv: {
        subscribe: (parent, args, { db }) =>
            pubSub.subscribe("new_cv"),
        resolve: (payload) => payload.cv,
    },

    updatedCv: {
        subscribe: (parent, args, { db}) =>
            pubSub.subscribe("update_cv"),
        resolve: (payload) => payload.cv,
    },

    deletedCv: {
        subscribe: (parent, args, { db }) =>
            pubSub.subscribe("delete_cv"),
        resolve: (payload) => payload.cv,
    },
};