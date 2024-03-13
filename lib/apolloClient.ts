import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc"
import { getHostAndCookie } from "lib/getHostAndCookie"

// export const getClient = (host) => {
//   let prefix = process.env.NODE_ENV === "production" ? "https://" : "http://"
//   if (!process.env.NEXT_PUBLIC_VERCEL_ENV) {
//     prefix = "http://"
//   }
//   console.log(prefix + host + "/api/graphql")
//   const { getClient } = registerApolloClient(() => {
//     return new ApolloClient({
//       cache: new InMemoryCache(),
//       link: new HttpLink({
//         // this needs to be an absolute url, as relative urls cannot be used in SSR
//         uri: prefix + host + "/api/graphql",
//         // you can disable result caching here if you want to
//         // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
//         // fetchOptions: { cache: "no-store" },
//       }),
//     })
//   })
//   return getClient()
// }

export const { getClient } = registerApolloClient(() => {
  const { host } = getHostAndCookie()
  let prefix = process.env.NODE_ENV === "production" ? "https://" : "http://"
  if (!process.env.NEXT_PUBLIC_VERCEL_ENV) {
    prefix = "http://"
  }
  console.log(prefix + host)
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: prefix + host + "/api/graphql",
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    }),
  })
})
