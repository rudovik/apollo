import createApolloServer from "lib/apolloSingleton"
import connectToMongoDB from "lib/mongooseSingleton"
import { NextRequest } from "next/server"

async function handler(req: NextRequest) {
  const _handler = await createApolloServer()
  await connectToMongoDB()

  const response = await _handler(req)
  return response
}

export { handler as GET, handler as POST }
