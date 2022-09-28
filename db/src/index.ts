import { ApolloServer } from "apollo-server";
// import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import {context} from './context'



// 1 The schema object you created using Nexus defines your GraphQL schema. You need to provide this when instantiating your server since that’s how Apollo Server knows which API operations to support in the GraphQL API.
import {schema} from "./schema"
export const server = new ApolloServer({
    schema,
    context, // ensures that we can access primsa with context.prisma in all resolvers
    // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()] sets up local apolloplayground on localhost:3000
})

const port = 8181; 
//2  You start the server and specify the port. After the server starts, it returns a url string inside a promise.
server.listen({port}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});