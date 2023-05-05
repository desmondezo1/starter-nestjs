import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SocialNetworkEnum } from '../entities/account.model';

export class FindAccountsDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsOptional()
  @IsEnum({
    enum: SocialNetworkEnum,
  })
  socialNetwork?: SocialNetworkEnum;

  @IsOptional()
  @IsString()
  groupName?: string;
}
