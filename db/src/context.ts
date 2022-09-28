import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

// 1: First you have defined the Context interface, which specifies what objects will be attached to the context object. Right now it’s just an instance of PrismaClient, but this can change as the project grows.
export interface Context {
 prisma: PrismaClient
}


// 2: You’re exporting the context object, so that it can be imported and used by the GraphQL server.
export const context: Context = {
    prisma, 
}