import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
export class Playstore {
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
  appLink: string;

  @Prop({
    type: Number,
  })
  rating: number;

  @Prop({
    type: Array,
    default: [],
  })
  config: [];

  @Prop({
    type: Array,
    default: [],
  })
  review: [];
}

export const PlaystoreSchema = SchemaFactory.createForClass(Playstore);
