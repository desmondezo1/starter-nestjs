import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { TwitterController } from './twitter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Twitter, TwitterSchema } from './entities/twitter.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Twitter.name, schema: TwitterSchema }]),
  ],
  controllers: [TwitterController],
  providers: [TwitterService],
})
export class TwitterModule {}
