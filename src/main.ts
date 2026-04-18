import * as dotenv from "dotenv";
dotenv.config();

import { createServer } from "node:http";
import { createYoga, renderGraphiQL } from "graphql-yoga";
import { createSchema } from "graphql-yoga";
import { Query } from "./prisma.query";
import { Mutation } from "./prisma.mutation";
import { Subscription } from "./prisma.subscription";
import { User } from "./prisma.user";
import { Cv } from "./prisma.cv";
import { Skill } from "./prisma.skill";
import { prisma } from "./prisma.client";

const fs = require("fs");
const path = require("path");

export const schema = createSchema({
    typeDefs: fs.readFileSync(
        path.join(__dirname, "./../schema/schema.graphql"),
        "utf-8"
    ),
    resolvers: { Query, Mutation, Subscription, User, Cv, Skill },
});

async function main() {
    console.log("Starting server...");

    const yoga = createYoga({ schema, renderGraphiQL });
    const server = createServer(yoga);

    server.listen(4000, () => {
        console.info("Server is running on http://localhost:4000/graphql");
    });
}

main().catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});