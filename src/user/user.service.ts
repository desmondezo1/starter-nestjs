import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto';
import {
  CatchExceptionHandler,
  CustomHttpException,
  StringEmpty,
} from 'src/lib';
import { SuccessReponse } from 'src/lib/success-response-handler';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDto>,
  ) {}

  async getAllUsers() {
    try {
      const users = await this.userModel
        .find({}, '-password -__v -hashedRt')
        .exec();
      return users;
    } catch (error) {
      CatchExceptionHandler(error);
    }
  }

  async getAUser(_id: string) {
    try {
      if (StringEmpty(_id))
        CustomHttpException(
          HttpStatus.BAD_REQUEST,
          'id should not be empty',
          'BAD_REQUEST',
        );

      if (!_id.match(/^[0-9a-fA-F]{24}$/))
        CustomHttpException(
          HttpStatus.UNPROCESSABLE_ENTITY,
          'invalid id',
          'UNPROCESSABLE_ENTITY',
        );

      const user = await this.userModel
        .findOne({ _id }, '-password -__v -hashedRt')
        .exec();

      if (!user)
        CustomHttpException(
          HttpStatus.NOT_FOUND,
          'User Not Found',
          'NOT_FOUND',
        );

      return user;
    } catch (error) {
      CatchExceptionHandler(error);
    }
  }

  async updateAUser(_id: string, data: UserDto) {
    try {
      if (StringEmpty(_id))
        CustomHttpException(
          HttpStatus.BAD_REQUEST,
          'id should not be empty',
          'BAD_REQUEST',
        );

      if (!_id.match(/^[0-9a-fA-F]{24}$/))
        CustomHttpException(
          HttpStatus.UNPROCESSABLE_ENTITY,
          'invalid id',
          'UNPROCESSABLE_ENTITY',
        );

      const user = await this.userModel.findOne({ _id }).exec();

      if (!user)
        CustomHttpException(
          HttpStatus.NOT_FOUND,
          'User Not Found',
          'NOT_FOUND',
        );

      if (data.password) {
        data.password = await this.hashData(data.password);
      }

      const userData = await this.userModel
        .findOneAndUpdate({ _id }, { $set: data }, { new: true })
        .select('-password -__v -hashedRt')
        .exec();

      return userData;
    } catch (error) {
      CatchExceptionHandler(error);
    }
  }

  async deleteAUser(_id: string) {
    try {
      if (StringEmpty(_id))
        CustomHttpException(
          HttpStatus.BAD_REQUEST,
          'id should not be empty',
          'BAD_REQUEST',
        );

      if (!_id.match(/^[0-9a-fA-F]{24}$/))
        CustomHttpException(
          HttpStatus.UNPROCESSABLE_ENTITY,
          'invalid id',
          'UNPROCESSABLE_ENTITY',
        );

      const user = await this.userModel.findOne({ _id }).exec();

      if (!user)
        CustomHttpException(
          HttpStatus.NOT_FOUND,
          'User Not Found',
          'NOT_FOUND',
        );

      await this.userModel.deleteOne({ _id }).exec();
    } catch (error) {
      CatchExceptionHandler(error);
    }
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
}
