"use server"

import { ApolloWrapper } from "lib/apolloWrapper"
import { getHostAndCookie } from "lib/getHostAndCookie"

export default async function RootLayout({ children }) {
  const { host, cookie } = getHostAndCookie()
  return (
    <html lang="en">
      <ApolloWrapper host={host} cookies={cookie}>
        <body>{children}</body>
      </ApolloWrapper>
    </html>
  )
}
