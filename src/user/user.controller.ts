import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { UserDto } from './dto';
import { UserService } from './user.service';
import { Success } from 'src/types';
import { SuccessReponse } from 'src/lib/success-response-handler';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getAllUsers(): Promise<Success> {
    const users = await this.userService.getAllUsers();
    return SuccessReponse(HttpStatus.OK, 'Fetched Users Successfully', users);
  }

  @Get(':id')
  async getAUser(@Param('id') _id: string): Promise<Success> {
    const user = await this.userService.getAUser(_id);
    return SuccessReponse(HttpStatus.OK, 'Fetched User Successfully', user);
  }

  @Patch(':id')
  async updateAUser(
    @Param('id') _id: string,
    @Body() data: UserDto,
  ): Promise<Success> {
    const userData = await this.userService.updateAUser(_id, data);
    return SuccessReponse(HttpStatus.OK, 'Updated User Successfully', userData);
  }

  @Delete(':id')
  async deleteAUser(@Param('id') _id: string): Promise<Success> {
    await this.userService.deleteAUser(_id);
    return SuccessReponse(HttpStatus.OK, 'Deleted User Successfully');
  }
}
