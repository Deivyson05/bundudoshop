import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsUrl({}, { message: 'imageUrl precisa ser uma URL valida' })
  @MaxLength(2048)
  imageUrl: string;

  @IsUrl({}, { message: 'affiliateLink precisa ser uma URL valida' })
  @MaxLength(2048)
  affiliateLink: string;
}
