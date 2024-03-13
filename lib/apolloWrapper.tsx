"use client"

import { ApolloLink, HttpLink } from "@apollo/client"
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr"

const uri = typeof window === "undefined" ? "http://localhost:8000" : ""

const makeClient = () => {
  const httpLink = new HttpLink({
    uri: uri + "/api/graphql",
    fetchOptions: { cache: "no-store" },
  })

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

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
