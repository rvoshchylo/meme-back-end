import { IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class UpdateMemeDto {
  @IsOptional()
  @IsString()
  @Length(3, 100)
  name?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Must be a valid URL' })
  image?: string;
}
