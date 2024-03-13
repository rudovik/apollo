import { Resolver, Query } from "type-graphql"

@Resolver()
export class WoodResolver {
  @Query(() => String, { nullable: false })
  async getAllWoods(): Promise<string> {
    return "There are many woods"
  }
}
