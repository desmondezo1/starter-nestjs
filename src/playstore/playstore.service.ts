import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreatePlaystoreDto } from './dto/create-playstore.dto';
import { UpdatePlaystoreDto } from './dto/update-playstore.dto';
import { Playstore } from './entities/playstore.model';

@Injectable()
export class PlaystoreService {
  constructor(
    @InjectModel(Playstore.name)
    private readonly playstoreModel: mongoose.Model<Playstore>,
  ) {}
  create(createPlaystoreDto: CreatePlaystoreDto) {
    return 'This action adds a new playstore';
  }

  findAll() {
    return `This action returns all playstore`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playstore`;
  }

  update(id: number, updatePlaystoreDto: UpdatePlaystoreDto) {
    return `This action updates a #${id} playstore`;
  }

  remove(id: number) {
    return `This action removes a #${id} playstore`;
  }
}
