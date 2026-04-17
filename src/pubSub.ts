import { createPubSub } from "graphql-yoga";
import { Cv } from "./entities/cv.entity";

export type CvMutationType = "ADDED" | "UPDATED" | "DELETED";

export const pubSub = createPubSub<{
    CV_CHANGED: [{ mutationType: CvMutationType; cv: Cv }];
}>();