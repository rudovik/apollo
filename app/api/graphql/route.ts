import createApolloServer from "lib/apolloSingleton"
import connectToMongoDB from "lib/mongooseSingleton"
import { NextRequest } from "next/server"
import { getClient } from "lib/apolloClient"
import { AuthDocument } from "lib/graphql/Auth.graphql"
import { getHostAndCookie } from "lib/getHostAndCookie"
import { NextResponse } from "next/server"
import mime from "mime"
import { v2 as cloudinary } from "cloudinary"

async function handler(req: NextRequest) {
  const { cookie } = getHostAndCookie()
  const _handler = await createApolloServer()
  await connectToMongoDB()

  const requestContentType = req.headers.get("content-type")
  if (
    requestContentType &&
    requestContentType.startsWith("multipart/form-data")
  ) {
    const client = getClient()

    const {
      data: { auth: user },
    } = await client.query({
      query: AuthDocument,
      errorPolicy: "ignore",
      context: {
        headers: cookie
          ? {
              cookie,
            }
          : {},
      },
    })

    // console.log(user)

    if (!(user.isAdmin && user.isAuth)) {
      return NextResponse.json({ success: false })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File
    const buffer = await file.arrayBuffer()
    const ext = file.name.split(".").pop()
    const b64 = Buffer.from(buffer).toString("base64")
    const type = mime.getType(ext)
    let dataURI = "data:" + type + ";base64," + b64

    const { url, public_id } = await cloudinary.uploader.upload(dataURI, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    })

    // const json = data.json()
    // console.log(json)

    return NextResponse.json({ url, public_id, success: true })
  }

  const response = await _handler(req)
  const contentType = response.headers.get("Content-Type")
  if (contentType === "application/json; charset=utf-8") {
    const json = await response.json()

    const rsp = NextResponse.json(json, { status: response.status })
    if ("errors" in json) return rsp
    if ("login" in json.data) {
      rsp.cookies.set("w_auth", json.data.login.user.token)
      return rsp
    } else if ("logout" in json.data) {
      rsp.cookies.delete("w_auth")
      return rsp
    }

    return rsp
  }
  return response
}

export { handler as GET, handler as POST }
