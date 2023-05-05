import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SuccessReponse } from 'src/lib/success-response-handler';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { FindAccountsDto } from './dto/find-accounts.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    try {
      const account = await this.accountsService.create(createAccountDto);
      return SuccessReponse(
        HttpStatus.CREATED,
        'account created successfully',
        account,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async findAll(@Query() query: FindAccountsDto) {
    try {
      const accounts = await this.accountsService.findAll(query);
      return SuccessReponse(HttpStatus.OK, 'Accounts Fetched', accounts);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const account = await this.accountsService.findOne(id);
      return SuccessReponse(HttpStatus.OK, 'Account Fetched', account);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    try {
      const updatedAccount = await this.accountsService.update(
        id,
        updateAccountDto,
      );
      return SuccessReponse(HttpStatus.OK, 'Account Updated', updatedAccount);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedAccount = await this.accountsService.remove(id);
      return SuccessReponse(HttpStatus.OK, 'Account deleted', deletedAccount);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('/bulk-create')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsvFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    const filePath = file.path;
    const results = await this.accountsService.handleBulkCreate(filePath);
    return results;
  }
}
