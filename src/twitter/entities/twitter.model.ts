import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
export class Twitter {
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
  tweets: string;

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
}

export const TwitterSchema = SchemaFactory.createForClass(Twitter);
