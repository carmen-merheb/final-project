import { Injectable } from '@angular/core';
import * as crypto from 'crypto';

@Injectable({
  providedIn: 'root',
})
export class GenerateUserIdService {
  constructor() {}

  stringToHash(userEmail: string): number {
    const name = userEmail.split('@')[0];
    const hash = crypto.createHash('md5').update(name).digest('hex');
    return parseInt(hash.substring(0, 8), 16);
  }
}
