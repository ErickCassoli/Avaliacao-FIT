import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { ImagesService } from './images.service';
import { Response } from 'express';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) { }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
        const image = await this.imagesService.findOne(id);

        res.set({
            'Content-Type': image.mimetype,
            'Content-Disposition': `inline; filename="${image.filename}"`,
        });

        return new StreamableFile(image.data);
    }
}
