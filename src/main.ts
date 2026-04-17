import { createServer } from "node:http";
import {createPubSub, createYoga, renderGraphiQL} from "graphql-yoga";
import { createSchema } from "graphql-yoga";
import {Query} from "./Query";
import { DB } from "./db/db";
import {Cv} from "./Cv";
import {User} from "./User";
import {Skill} from "./Skill";
import {Mutation} from "./Mutation";
import {Subscription} from "./Subscription";
const fs = require("fs");
const path = require("path");
export const pubSub = createPubSub();
export const schema = createSchema({
    typeDefs: fs.readFileSync(
        path.join(__dirname, "./../schema/schema.graphql"),
        "utf-8"
    ),
    resolvers: {
        Query,
        Cv,
        User,
        Skill,
        Mutation,
        Subscription,

    },
});

const yoga = createYoga({ schema, context: { db: DB }, renderGraphiQL });
const server = createServer(yoga);
server.listen(4000, () => {
    console.info(`
Server is running on http://localhost:4000/graphql`
    );
});


