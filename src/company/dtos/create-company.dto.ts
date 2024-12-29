import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';

export class CreateCompanyDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  taxNumber?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  city?: string;

  @IsOptional()
  postalCode?: string;

  @IsOptional()
  state?: string;

  @IsOptional()
  country?: string;

  @IsOptional()
  currency?: string;

  @IsOptional()
  locale?: string;

  createdBy: UserEntity;
}
