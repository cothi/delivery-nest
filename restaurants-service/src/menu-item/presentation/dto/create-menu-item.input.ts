import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload-minimal';

export interface FileUpload {
  filename: string;
  mimetype: string;
  buffer: string;
}
@InputType()
export class CreateMenuItemInput {
  @Field()
  menuCategoryId: string;

  @Field()
  restaurantId: string;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  description: string;

  @Field(() => GraphQLUpload)
  file: FileUpload;
}


