import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Returns a greeting.
   * @returns 'Hello World!' string.
   */
  getHello(): string {
    return 'Hello World!';
  }
}
