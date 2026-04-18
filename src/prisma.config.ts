import path from "path";
import { defineConfig } from "prisma/config";

export default defineConfig({
    schema: path.join(__dirname, "./prisma/schema.prisma"),
    migrations: {
        path: './prisma/migrations',
    },
    datasource: {
        url: "postgresql://postgres:Abc123987456@localhost:5432/cvs",
    },
});