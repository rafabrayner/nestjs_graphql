import { InputType } from '@nestjs/graphql';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
