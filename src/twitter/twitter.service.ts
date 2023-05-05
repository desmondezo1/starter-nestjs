import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateTwitterDto } from './dto/create-twitter.dto';
import { UpdateTwitterDto } from './dto/update-twitter.dto';
import { Twitter } from './entities/twitter.model';

@Injectable()
export class TwitterService {
  constructor(
    @InjectModel(Twitter.name)
    private readonly twitterModel: mongoose.Model<Twitter>,
  ) {}
  create(createTwitterDto: CreateTwitterDto) {
    return 'This action adds a new twitter';
  }

  findAll() {
    return `This action returns all twitter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} twitter`;
  }

  update(id: number, updateTwitterDto: UpdateTwitterDto) {
    return `This action updates a #${id} twitter`;
  }

  remove(id: number) {
    return `This action removes a #${id} twitter`;
  }
}
