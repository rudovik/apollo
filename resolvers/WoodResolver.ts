import { Resolver, Query } from "type-graphql"
import { Wood } from "models/Wood"
import { WoodModel } from "models/Wood"

@Resolver()
export class WoodResolver {
  @Query(() => [Wood], { nullable: true })
  async getAllWoods(): Promise<Wood[]> {
    const woods = await WoodModel.find({})
    return woods
  }
}
