import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { SocialNetworkEnum } from '../entities/account.model';
import { CreateAccountDto } from './create-account.dto';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
  @IsOptional()
  socialNetwork?: SocialNetworkEnum;

  @IsOptional()
  accountName?: string;

  @IsOptional()
  username?: string;

  @IsOptional()
  status?: string;

  @IsOptional()
  password?: string;
}
