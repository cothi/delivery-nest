import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class KakaoAuthInput {
  @Field()
  @IsString()
  code: string;
}
