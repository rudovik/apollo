"use client"
import { HomeSlider } from "components/HomeSlider"
import { HomePromotion } from "components/HomePromotion"
import { useGetSortedProductsSuspenseQuery } from "lib/graphql/GetSortedProducts.graphql"
import { SortBy } from "__generated__/__types__"
import { CardBlock } from "components/CardBlock"

export default function Page() {
  const {
    data: bySoldData,
    // loading: bySoldLoading,
    error: bySoldError,
    client,
  } = useGetSortedProductsSuspenseQuery({
    variables: {
      sortBy: SortBy.Sold,
      limit: 4,
      order: "desc",
    },
  })

  const {
    data: byArrivalData,
    // loading: byArrivalLoading,
    error: byArrivalError,
  } = useGetSortedProductsSuspenseQuery({
    variables: {
      sortBy: SortBy.CreatedAt,
      limit: 4,
      order: "desc",
    },
  })

  return (
    <div>
      <HomeSlider />

      <CardBlock
        list={bySoldData.getSortedProducts}
        title="Best Selling Guitars"
      />

      <HomePromotion />

      <CardBlock list={byArrivalData.getSortedProducts} title="New Arrivals" />
    </div>
  )
}
