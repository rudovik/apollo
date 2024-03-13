import initServer from "lib/apollo-singleton"
import { NextRequest } from "next/server"

async function handler(req: NextRequest) {
  const _handler = await initServer()

  const response = await _handler(req)
  return response
}

export { handler as GET, handler as POST }
