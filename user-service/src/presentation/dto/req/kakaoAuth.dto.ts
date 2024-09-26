import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class KakaoAuthDto {
  @Field()
  @IsString()
  code: string;
}
