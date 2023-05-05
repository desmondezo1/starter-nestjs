import { Module } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { FacebookController } from './facebook.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FaceBook, FacebookSchema } from './entities/facebook.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FaceBook.name, schema: FacebookSchema },
    ]),
  ],
  controllers: [FacebookController],
  providers: [FacebookService],
})
export class FacebookModule {}
