"use client"

// import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { useGetAllWoodsSuspenseQuery } from "lib/graphql/GetAllWoods.graphql"

export default function Page() {
  // const { data } = useSuspenseQuery<any>(GetAllWoodsDocument, {
  //   errorPolicy: "ignore",
  // })

  const { data } = useGetAllWoodsSuspenseQuery()
  // console.log(data)
  return <h1>Hello, Next.js</h1>
}
