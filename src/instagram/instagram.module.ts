import { Module } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { InstagramController } from './instagram.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Instagram, InstagramSchema } from './entities/instagram.model';
import { PuppeteerService } from 'src/puppeteer/puppeteer.service';
import { ConfigModule } from '@nestjs/config';
// import { BullModule } from '@nestjs/bull'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Instagram.name, schema: InstagramSchema },
    ]),
    ConfigModule,
  ],
  controllers: [InstagramController],
  providers: [InstagramService, PuppeteerService],
})
export class InstagramModule {}
