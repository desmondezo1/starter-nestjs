import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
export class Instagram {
  @Prop({
    type: String,
    required: [true, 'Please provide a campaign Name'],
  })
  campaignName: string;

  @Prop({
    type: Date,
  })
  campaignDate: Date;

  @Prop({
    type: Array,
    default: [],
  })
  posts: [];

  @Prop({
    type: Array,
    default: [],
  })
  config: [];

  @Prop({
    type: Array,
    default: [],
  })
  comments: [];

  @Prop({
    type: Array,
    default: [],
  })
  accountsToFollow: [];
}

export const InstagramSchema = SchemaFactory.createForClass(Instagram);
