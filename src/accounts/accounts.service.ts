import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createReadStream } from 'fs';
import mongoose from 'mongoose';
import { CreateAccountDto } from './dto/create-account.dto';
import { FindAccountsDto } from './dto/find-accounts.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.model';
import * as csv from 'csv-parser';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountRepo: mongoose.Model<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    try {
      const { accountName, groupName, password, socialNetwork, username } =
        createAccountDto;
      const accountExists = await this.accountRepo
        .findOne({
          accountName,
          userName: username,
          socialNetwork,
        })
        .exec();

      if (accountExists) {
        throw new HttpException(
          'Account Already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newAccount = new this.accountRepo({
        accountName,
        groupName,
        password,
        userName: username,
        socialNetwork,
      });

      return newAccount.save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async handleBulkCreate(filePath: string) {
    try {
      const results = [];
      const errors = [];

      return new Promise((resolve, reject) => {
        let rowCount = 0;
        createReadStream(filePath)
          .pipe(csv())
          .on('headers', (headers) => {
            if (
              headers.indexOf('socialNetwork') < 0 ||
              headers.indexOf('accountName') < 0 ||
              headers.indexOf('username') < 0 ||
              headers.indexOf('password') < 0
            ) {
              reject(
                new Error(
                  'Invalid CSV file format: missing required column(s)',
                ),
              );
            }
          })
          .on('data', async (data) => {
            rowCount++;
            const {
              socialNetwork,
              groupName,
              accountName,
              username,
              password,
            } = data;
            const upload = new this.accountRepo({
              socialNetwork,
              accountName,
              username,
              password,
            });
            if (groupName) {
              upload.groupName = groupName;
            }

            upload
              .save()
              .then((doc) => {
                results.push(doc);
              })
              .catch((err) => {
                errors.push({ row: rowCount, error: err.message });
              });
          })
          .on('end', () => resolve({ insertedCount: results.length, errors }))
          .on('error', (error) => reject(error));
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(query: FindAccountsDto) {
    try {
      const accounts = await this.accountRepo.find(query).exec();
      if (!accounts) {
        throw new HttpException('Accounts not found', HttpStatus.NOT_FOUND);
      }
      return accounts;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(_id: string) {
    try {
      if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new HttpException('Invalid ID', HttpStatus.UNPROCESSABLE_ENTITY);
      }
      const account = await this.accountRepo.findById(_id).exec();
      if (!account) {
        throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
      }
      return account;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(_id: string, updateAccountDto: UpdateAccountDto) {
    try {
      if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new HttpException('Invalid ID', HttpStatus.UNPROCESSABLE_ENTITY);
      }
      const updatedAccount = await this.accountRepo.updateOne(
        { _id: _id },
        updateAccountDto,
      );
      if (!updatedAccount) {
        throw new HttpException(
          'Update failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return updatedAccount;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(_id: string) {
    try {
      if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new HttpException('Invalid ID', HttpStatus.UNPROCESSABLE_ENTITY);
      }
      const deleted = await this.accountRepo.findByIdAndDelete(_id);
      return deleted;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
