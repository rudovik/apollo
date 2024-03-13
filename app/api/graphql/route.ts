import "reflect-metadata"
// import initServer from "lib/apollo-singleton"
import { NextRequest } from "next/server"
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { gql } from "graphql-tag"
import path from "path"
import { ObjectIdScalar } from "types/objectIdScalar"
import { WoodResolver } from "resolvers/WoodResolver"
import { buildSchema } from "type-graphql"
import { ObjectId } from "mongodb"

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

async function handler(req: NextRequest) {
  let p: string = path.resolve(__dirname, "schema.gql")
  p = p.split(".next")[0] + "lib" + path.sep + "schema.graphqls"

  const _handler = startServerAndCreateNextHandler(server)

  const schema = await buildSchema({
    resolvers: [WoodResolver],
    emitSchemaFile: true,
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: true,
  })

  const response = await _handler(req)
  return response
}

// const handler = startServerAndCreateNextHandler(server)

export { handler as GET, handler as POST }
