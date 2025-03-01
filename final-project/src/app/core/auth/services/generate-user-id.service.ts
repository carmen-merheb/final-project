import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenerateUserIdService {
  constructor() {}

  async stringToHash(userEmail: string): Promise<number> {
    const name = userEmail.split('@')[0];
    const encoder = new TextEncoder();
    const data = encoder.encode(name);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return parseInt(hashHex.substring(0, 8), 16);
  }
}
