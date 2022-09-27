1. make a backend directory 
2. initialize node with npm node 
3. make a src directory and place two files a index.ts file and a schema file.

<installation>
4. install Nexus, Typescript and apollo first start with typescript  npm install --save-dev typescript@^4.3.5 ts-node-dev@^1.1.8 && npx -p typescript tsc --init
5. adjust your tsconfig with compiler options settings, strictness to true, rootdir to . outdir to dist sourcemap to true and esmoduleinterop to true 
6. next hit npm install apollo-server@^3.1.1 graphql@^15.5.1 nexus@^1.1.0
7. in schema.ts import makeSchema and join destructured from path and nexus 

<setting up nexus and graphql>
7a. export a const schema and initialize your new schemaobjectct = makeSchema({types: [], outputs: {schema:join(process.cwd(), "schema.graphql"), typegen: join(process.cwd(), "nexus-typegen.ts"))}})
// 1: Your GraphQL schema will consist of many types that you will pass as an array to the types object. For now, it is intentionally kept empty.
// 2: The first output file that Nexus will generate for you is a GraphQL schema file of type .graphql. This is the GraphQL Schema Definition Language (SDL) for defining the structure of your API. You will learn more about this later in the chapter!
// 3: The second output file is a TypeScript file known as typegen, which will contain TypeScript type definitions for all types in your GraphQL schema. These generated types will help ensure typesafety in your application code and keep your GraphQL schema definition in sync with your schema implementation. Again, more on this later.
7b.  run npx ts-node --transpile-only src/schema 
8. this will make schema.graphql and nexus-typegen.ts 
9.  adjust your package.json into     "dev": "ts-node-dev --transpile-only --no-notify --exit-child src/index.ts",
    "generate": "ts-node --transpile-only src/schema.ts"

<GRAPHQL SERVER>
1. in index.ts
2. import ApolloServer and schema 
3. export a const server = new ApolloServer({
    schema,
})
4. define a port and hit the server.listen({port}.then(({url}) => (console.log('server at ${url}))))

<Extending the schema definition>
1. make new folder called graphql 
2. place index file and Link file here 
3. in Link import objectType from nexus 
4. export const Link = objectType({
    name: 'Link',
    definition(t) {
        t.nonNull.int("id"),
        t.nonNull.String("description")
        t.nonNull.String("url")
    }
}) // this defines our graphql queries for nexus to auto generate 
5. next set export * from "./Link" and go to schema and import * as types followed by adjust types: [] into just types --> check your schema file for your query 

<Expanding the Link query>
1.importeer het volgende import { extendType, objectType } from 'nexus'
import { NexusGenObjects } from '../../nexus-typegen'
2. onder je Link export const maak een nieuwe definitie zeg let links: nexusgenobjects['Link'][] = [
    definieer hier een aantal objecten met data dus {id: 1, url: "google.nl", description: "some description"},
    etc.. 
]

3. vervolgens wil je de Query schema in schema.graphql updaten zeg; export const LinkQuery = extendType({ type: 'Query' , t.nonNull.list.nonNull.field('feed', {type: 'Link', resolve(parent, args, context, info) {return links} })}) // dit helpt met het handelen van je query dat je nu het volgende kan doen query {
  feed {
    id
    url
    description
  }
}

<Mutations>

