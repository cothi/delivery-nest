import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class GetMenuCategoryInput {
  @Field(() => ID)
  id: string;
}
