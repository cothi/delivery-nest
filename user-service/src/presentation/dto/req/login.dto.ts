import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class LoginInput {
    @Field()
    nickname: string;

    @Field()
    password: string;

}
