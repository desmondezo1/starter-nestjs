import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class FaceBook {
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

  @Prop({
    type: String,
  })
  reactionType: string;
}

export const FacebookSchema = SchemaFactory.createForClass(FaceBook);
