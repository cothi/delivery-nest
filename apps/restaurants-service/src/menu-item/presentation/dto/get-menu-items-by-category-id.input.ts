import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetMenuItemsByCategoryIdInput {
  @Field()
  categoryId: string;
}
