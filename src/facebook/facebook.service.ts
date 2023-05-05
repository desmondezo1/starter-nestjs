import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateFacebookDto } from './dto/create-facebook.dto';
import { UpdateFacebookDto } from './dto/update-facebook.dto';
import { FaceBook } from './entities/facebook.model';

@Injectable()
export class FacebookService {
  constructor(
    @InjectModel(FaceBook.name)
    private readonly facebookmodel: mongoose.Model<FaceBook>,
  ) {}

  create(createFacebookDto: CreateFacebookDto) {
    return 'This action adds a new facebook';
  }

  findAll() {
    return `This action returns all facebook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} facebook`;
  }

  update(id: number, updateFacebookDto: UpdateFacebookDto) {
    return `This action updates a #${id} facebook`;
  }

  remove(id: number) {
    return `This action removes a #${id} facebook`;
  }
}
