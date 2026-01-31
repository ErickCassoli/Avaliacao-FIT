import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image {
    @Prop({ required: true })
    filename: string;

    @Prop({ required: true })
    mimetype: string;

    @Prop({ required: true }) // Storing binary data directly as Buffer
    data: Buffer;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
