import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: "The user name can't be null" })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: "The user email can't be null" })
  email: string;
}
