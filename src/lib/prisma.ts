import { PrismaClient } from "@prisma/client";

// Declare a global variable for PrismaClient to prevent multiple instances in development
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a singleton instance of PrismaClient
const prismaInstance = global.prisma || new PrismaClient();

// In development, store the PrismaClient instance globally
if (process.env.NODE_ENV === "development") {
  global.prisma = prismaInstance;
}

export default prismaInstance;
