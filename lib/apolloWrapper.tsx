"use client"

import { ApolloLink, HttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr"

const makeClient = (host, cookies) => {
  const linkWithContext = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Cookie: cookies,
      },
    }
  })

  let prefix = process.env.NODE_ENV === "production" ? "https://" : "http://"
  if (!process.env.NEXT_PUBLIC_VERCEL_ENV) {
    prefix = "http://"
  }

  const uri = typeof window === "undefined" ? prefix + host : ""
  const simpleLink = new HttpLink({
    uri: `${uri}/api/graphql`,
    fetchOptions: { cache: "no-store" },
  })

  const httpLink = cookies ? linkWithContext.concat(simpleLink) : simpleLink

  return new NextSSRApolloClient({
    connectToDevTools: process.env.NODE_ENV === "development" ? true : false,
    cache: new NextSSRInMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getProductsToShop: {
              keyArgs: ["filters"],
              merge(existing, incoming) {
                return existing
                  ? {
                      ...existing,
                      products: [...existing.products, ...incoming.products],
                      size: incoming.size,
                    }
                  : incoming
              },
            },
          },
        },
      },
    }),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  })
}

export function ApolloWrapper({ children, host, cookies }) {
  return (
    <ApolloNextAppProvider makeClient={() => makeClient(host, cookies)}>
      {children}
    </ApolloNextAppProvider>
  )
}
