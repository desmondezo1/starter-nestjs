import { Module } from '@nestjs/common';
import { PlaystoreService } from './playstore.service';
import { PlaystoreController } from './playstore.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Playstore, PlaystoreSchema } from './entities/playstore.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playstore.name, schema: PlaystoreSchema },
    ]),
  ],
  controllers: [PlaystoreController],
  providers: [PlaystoreService],
})
export class PlaystoreModule {}
