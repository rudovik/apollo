"use server"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"

import { ApolloWrapper } from "lib/apolloWrapper"
import { getHostAndCookie } from "lib/getHostAndCookie"
import { AuthProvider } from "lib/useAuth"

export default async function RootLayout({ children }) {
  const { host, cookie } = getHostAndCookie()
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <ApolloWrapper host={host} cookies={cookie}>
          <AuthProvider cookie={cookie}>
            <body>{children}</body>
          </AuthProvider>
        </ApolloWrapper>
      </AppRouterCacheProvider>
    </html>
  )
}
