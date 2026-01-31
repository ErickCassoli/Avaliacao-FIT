import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorResponse {
    @ApiProperty({ example: 400 })
    statusCode!: number;

    @ApiProperty({ example: 'Validation failed' })
    message!: string | string[];

    @ApiProperty({ example: 'Bad Request' })
    error!: string;

    @ApiProperty({ example: '2023-10-27T10:00:00.000Z' })
    timestamp!: string;

    @ApiProperty({ example: '/books' })
    path!: string;
}
