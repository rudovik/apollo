import { ApolloWrapper } from "lib/apolloWrapper"
import { headers } from "next/headers"
import { getCookies } from "lib/getCookies"

export default function RootLayout({ children }) {
  const headerList = headers()
  const host = headerList.get("Host")
  const cookies = getCookies()
  console.log(cookies)

  return (
    <html lang="en">
      <ApolloWrapper host={host} cookies={cookies}>
        <body>{children}</body>
      </ApolloWrapper>
    </html>
  )
}
