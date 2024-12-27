import { IsDefined, IsEmail, IsStrongPassword } from 'class-validator';

export default class AuthenticationRegisterDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsStrongPassword()
  password: string;
}
