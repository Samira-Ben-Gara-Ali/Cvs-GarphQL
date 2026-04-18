import { PrismaClient } from "@prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";

export const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: "postgresql://postgres:Abc123987456@localhost:5432/cvs",
    }),
});