import { accountType } from 'src/accounts/dto/create-account.dto';

export class CommentAccountDto {
  url: string;
  comment: string | string[];
  account: accountType[];
  config?: Array<any>;
}
