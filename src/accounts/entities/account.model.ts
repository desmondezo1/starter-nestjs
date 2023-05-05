import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum SocialNetworkEnum {
  TWITTER = 'twitter',
  FACEBOOK = 'facebook',
  YOUTUBE = 'youtube',
  INSTAGRAM = 'instagram',
  TIKTOK = 'tiktok',
  PLAYSTORE = 'playstore',
}

@Schema({
  timestamps: true,
})
export class Account {
  @Prop({
    type: String,
    required: [true, 'provide a social network'],
    enum: SocialNetworkEnum,
  })
  socialNetwork: SocialNetworkEnum;

  @Prop({
    type: String,
  })
  accountName: string;

  @Prop({
    type: String,
    required: [true, 'Please provide an account username'],
  })
  userName: string;

  @Prop({
    type: String,
    required: [true, 'Please provide a password'],
  })
  password: string;

  @Prop({
    type: String,
  })
  status: string;

  @Prop({
    type: String,
  })
  groupName: string;

  @Prop({
    type: Number,
  })
  proxyAddress: number;

  @Prop({
    type: Number,
  })
  browserAutomation: number;

  @Prop({
    type: Number,
  })
  friendshipCount: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
