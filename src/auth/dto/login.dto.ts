import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(3, 32)
  name: string;
}
