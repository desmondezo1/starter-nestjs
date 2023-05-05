import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SocialNetworkEnum } from '../entities/account.model';

export type accountType = {
  username: string;
  password: string;
};
export class CreateAccountDto {
  @IsNotEmpty({
    message: 'Provide a social Network',
  })
  @IsEnum(SocialNetworkEnum)
  socialNetwork: SocialNetworkEnum;

  @IsOptional()
  @IsString()
  groupName: string;

  @IsNotEmpty({
    message: 'please provide an account name',
  })
  @IsString()
  accountName: string;

  @IsNotEmpty({
    message: 'please provide a username for the account',
  })
  @IsString()
  username: string;

  @IsNotEmpty({
    message: 'please provide a password for the account',
  })
  @IsString()
  password: string;
}
