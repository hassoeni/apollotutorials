import {makeSchema} from 'nexus'
import {join} from 'path'
import * as types from './graphql'

export const schema = makeSchema({
	types, // 1 Your GraphQL schema will consist of many types that you will pass as an array to the types object
	outputs: {
		schema: join(process.cwd(), 'schema.graphql'), // 2 : The first output file that Nexus will generate for you is a GraphQL schema file of type .graphql. This is the GraphQL Schema Definition Language (SDL) for defining the structure of your API.
		typegen: join(process.cwd(), 'nexus-typegen.ts'), // 3: The second output file is a TypeScript file known as typegen, which will contain TypeScript type definitions for all types in your GraphQL schema. These generated types will help ensure typesafety in your application code and keep your GraphQL schema definition in sync with your schema implementation
	},
}) 

// 4: run npx ts-node --transpile-only src/schema to generate the files in this document hierna met npm run generate 
