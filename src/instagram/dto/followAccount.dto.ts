import { accountType } from 'src/accounts/dto/create-account.dto';

export class CreateLikesDto {
  url: string;
  account: accountType[];
  config?: any;
}
