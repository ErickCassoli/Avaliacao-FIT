import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { ImagesService } from './images.service';
import { Response } from 'express';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('images')
@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) { }

    @Get(':id')
    @ApiOperation({ summary: 'Stream an image by ID' })
    @ApiResponse({ status: 200, description: 'Returns the image stream.' })
    @ApiResponse({ status: 404, description: 'Image not found.' })
    async findOne(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
        const image = await this.imagesService.findOne(id);

        res.set({
            'Content-Type': image.mimetype,
            'Content-Disposition': `inline; filename="${image.filename}"`,
        });

        return new StreamableFile(image.data);
    }
}
