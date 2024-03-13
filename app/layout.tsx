"use server"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"

import { ApolloWrapper } from "lib/apolloWrapper"
import { getHostAndCookie } from "lib/getHostAndCookie"
import { AuthProvider } from "lib/useAuth"

import { oswald } from "./fonts"
import "./global.css"
import { Header } from "components/Header"
import { Footer } from "components/Footer"

export default async function RootLayout({ children }) {
  const { host, cookie } = getHostAndCookie()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
      </head>
      <AppRouterCacheProvider>
        <ApolloWrapper host={host} cookies={cookie}>
          <AuthProvider cookie={cookie}>
            <body className={oswald.className}>
              <Header />
              <div className="page_container">{children}</div>
              <Footer />
            </body>
          </AuthProvider>
        </ApolloWrapper>
      </AppRouterCacheProvider>
    </html>
  )
}
