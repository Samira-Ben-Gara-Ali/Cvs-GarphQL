import * as dotenv from "dotenv";
dotenv.config();

import { createServer } from "node:http";
import { createYoga, renderGraphiQL } from "graphql-yoga";
import { createSchema } from "graphql-yoga";
import { Query } from "./typeorm.query";
import { Mutation } from "./typeorm.mutation";
import { Subscription } from "./typeorm.subscription";
import { User } from "./typeorm.user";
import { Role } from "./typeorm.role";
import { Cv } from "./typeorm.cv";
import { Skill } from "./typeorm.skill";
import { prisma } from "./prisma.client";

const fs = require("fs");
const path = require("path");

export const schema = createSchema({
    typeDefs: fs.readFileSync(
        path.join(__dirname, "./../schema/schema.graphql"),
        "utf-8"
    ),
    resolvers: { Query, Mutation, Subscription, User, Role, Cv, Skill },
});

async function main() {
    await prisma.$connect();
    console.log("Database connected");

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