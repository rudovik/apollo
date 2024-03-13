// import initServer from "lib/apollo-singleton"
import { NextRequest } from "next/server"
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { gql } from "graphql-tag"

// async function handler(req: NextRequest) {
//   const _handler = await initServer()

//   const response = await _handler(req)
//   return response
// }

const resolvers = {
  Query: {
    hello: () => "world",
  },
}

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const server = new ApolloServer({
  resolvers,
  typeDefs,
})

const handler = startServerAndCreateNextHandler(server)

export { handler as GET, handler as POST }
