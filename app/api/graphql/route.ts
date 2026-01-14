import { createContext } from "@/graphql/context";
import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/schema";
import { createSchema, createYoga } from "graphql-yoga";

const checkDev = process.env.NODE_ENV === "development";

const yoga = createYoga({
  schema: createSchema({ typeDefs: typeDefs, resolvers: resolvers }),
  context: createContext,
  graphqlEndpoint: "/api/graphql",
  graphiql: checkDev,
  maskedErrors: !checkDev,
  cors: {
    origin: checkDev
      ? ["http://localhost:3000"]
      : ["https://circulet.vercel.app"],
    credentials: true,
  },
  logging: checkDev ? "debug" : "error",
});

export const GET = yoga;
export const POST = yoga;

{
  /* dummy method if anything cracks in the future */
}

// export async function POST(req: Request) {
//     return yoga.fetch(req)
// }
