import { ApolloWrapper } from "lib/apolloWrapper"
import { headers } from "next/headers"

export default function RootLayout({ children }) {
  const headerList = headers()
  const host = headerList.get("Host")
  console.log(host)

  return (
    <html lang="en">
      <ApolloWrapper host={host}>
        <body>{children}</body>
      </ApolloWrapper>
    </html>
  )
}
