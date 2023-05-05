import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
export class Youtube {
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
    type: String,
  })
  video: string;

  @Prop({
    type: String,
  })
  channel: string;

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

export const YoutubeSchema = SchemaFactory.createForClass(Youtube);
