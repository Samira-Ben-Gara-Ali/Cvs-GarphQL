import { createPubSub } from "graphql-yoga";
import { Cv, User, Skill } from "@prisma/client";

export type CvMutationType = "ADDED" | "UPDATED" | "DELETED";

export type CvWithRelations = Cv & { user: User; skills: Skill[] };

export const pubSub = createPubSub<{
    CV_CHANGED: [{ mutationType: CvMutationType; cv: CvWithRelations }];
}>();