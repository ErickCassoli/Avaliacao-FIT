import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './schemas/image.schema';

@Injectable()
export class ImagesService {
    constructor(@InjectModel(Image.name) private imageModel: Model<ImageDocument>) { }

    async upload(file: Express.Multer.File): Promise<ImageDocument> {
        const newImage = new this.imageModel({
            filename: file.originalname,
            mimetype: file.mimetype,
            data: file.buffer,
        });
        return newImage.save();
    }

    async findOne(id: string): Promise<Image> {
        const image = await this.imageModel.findById(id).exec();
        if (!image) {
            throw new NotFoundException(`Image with ID ${id} not found`);
        }
        return image;
    }
}
