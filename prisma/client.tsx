import type { PrismaClient as PrismaType } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface Global {}
  }
}

interface CustomGlobal extends NodeJS.Global {
  prisma: PrismaType;
}
declare const global: CustomGlobal;
export const prisma = global.prisma || new PrismaClient();
