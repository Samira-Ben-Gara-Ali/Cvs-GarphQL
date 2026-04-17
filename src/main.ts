import * as dotenv from "dotenv";

dotenv.config();

import { createServer } from "node:http";
import {createPubSub, createYoga, renderGraphiQL} from "graphql-yoga";
import { createSchema } from "graphql-yoga";
import {Query} from "./typeorm.query";
import { DB } from "./db/db";
import "reflect-metadata";
import {AppDataSource} from "./app-data.source";
import {Mutation} from "./typeorm.mutation";
import {User} from "./typeorm.user";
import {Role} from "./typeorm.role";
import {Cv} from "./typeorm.cv";
import {Skill} from "./typeorm.skill";

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
        Mutation,
        User,
        Role,
        Cv,
        Skill,
    },
});

async function main() {
    await AppDataSource.initialize()
        .then(() => {
            console.log("database connected and tables created");
        })
        .catch(console.error);
    const yoga = createYoga({ schema, context: { db: DB }, renderGraphiQL });
    const server = createServer(yoga);
    server.listen(4000, () => {
        console.info(`
Server is running on http://localhost:4000/graphql`
        );
    });
}
main();
