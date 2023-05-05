import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Youtube, YoutubeSchema } from './entities/youtube.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Youtube.name, schema: YoutubeSchema }]),
  ],
  controllers: [YoutubeController],
  providers: [YoutubeService],
})
export class YoutubeModule {}
