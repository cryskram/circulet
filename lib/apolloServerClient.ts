import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export function getClient() {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: `${process.env.BASE_URL}/api/graphql`,
    }),
    cache: new InMemoryCache(),
  });
}
