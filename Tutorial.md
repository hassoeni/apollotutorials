1. installeer apollo client met npm install @apollo/client graphql
2. initialize apollo client door import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';  te importeren 
Next we'll initialize ApolloClient, passing its constructor a configuration object with the uri and cache fields:
const client = new ApolloClient({
  uri: 'https://flyby-gateway.herokuapp.com/',   //Graphql Server
  cache: new InMemoryCache(), // cache query results after fetching 
})
3. nu kan je data gaan fetchen door te zeggen client.query({query: gql`query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  })
  .then((result) => console.log(result));
4. Initialiseer ApolloProvider en pass client als props aan client 
5. nu kan je gebruik maken van useQuery overal om de data te fetchen. 
6. 

