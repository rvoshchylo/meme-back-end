import { IsString, IsInt, Min, Max, IsUrl } from 'class-validator';

export class CreateMemeDto {
  @IsString()
  name: string;

  @IsUrl()
  image: string;

  @IsInt()
  @Min(0)
  @Max(99)
  likes: number;
}
