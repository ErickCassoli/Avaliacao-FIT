import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Health check endpoint.
   * @returns A simple greeting string.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
