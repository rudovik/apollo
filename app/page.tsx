"use client"

import { useGetAllWoodsSuspenseQuery } from "lib/graphql/GetAllWoods.graphql"

export default function Page() {
  const {
    data: { getAllWoods: woods },
    error: woodsError,
  } = useGetAllWoodsSuspenseQuery()
  console.log(woods)
  return <h1>Hello, Next.js</h1>
}
