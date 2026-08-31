import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { envs } from "../../config/envs.js";

const adapter = new PrismaPg({
    connectionString: envs.POSTGRES_URL,
});

export const prisma = new PrismaClient({ adapter });