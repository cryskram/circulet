import { createContext } from "@/graphql/context";
import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/schema";
import { createSchema, createYoga } from "graphql-yoga";

const yoga = createYoga({
  schema: createSchema({ typeDefs: typeDefs, resolvers: resolvers }),
  context: createContext,
  graphqlEndpoint: "/api/graphql",
  graphiql: process.env.NODE_ENV === "development",
});

export const GET = yoga;
export const POST = yoga;
// export async function POST(req: Request) {
//     return yoga.fetch(req)
// }
