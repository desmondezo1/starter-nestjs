import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BullModule } from '@nestjs/bull';
// import * as dotenv from 'dotenv';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { AccountsModule } from './accounts/accounts.module';
import { TwitterModule } from './twitter/twitter.module';
import { InstagramModule } from './instagram/instagram.module';
import { FacebookModule } from './facebook/facebook.module';
import { YoutubeModule } from './youtube/youtube.module';
import { PlaystoreModule } from './playstore/playstore.module';
import { ConfigModule } from '@nestjs/config';
import { PuppeteerService } from './puppeteer/puppeteer.service';

// dotenv.config();

if (!process.env.MONGO_URL) throw new Error('Missing MONGO_URL');

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    // BullModule.forRoot({
    //   redis: {
    //     host: 'localhost',
    //     port: 6379,
    //   },
    // }),
    // BullModule.registerQueue({
    //   name: 'puppeteer',
    // }),
    UserModule,
    AuthModule,
    AccountsModule,
    TwitterModule,
    InstagramModule,
    FacebookModule,
    YoutubeModule,
    PlaystoreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AtGuard },
    PuppeteerService,
  ],
})
export class AppModule {}
