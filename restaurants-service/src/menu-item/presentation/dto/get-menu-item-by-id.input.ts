import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetMenuItemByIdInput {
  @Field()
  id: string;
}
