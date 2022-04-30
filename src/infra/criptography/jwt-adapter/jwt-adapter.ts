import jwt from 'jsonwebtoken';

import { Decrypter } from '@/data/protocols/criptography/decrypter';
import { Encrypter } from '@/data/protocols/criptography/encrypter';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(plaintext: string): Promise<string> {
    const ciphertext = await jwt.sign({ id: plaintext }, this.secret);
    return ciphertext;
  }

  async decrypt(token: string): Promise<string> {
    const plaintext: any = await jwt.verify(token, this.secret);
    return plaintext;
  }
}
