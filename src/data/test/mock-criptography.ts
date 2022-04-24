import { Hasher } from '@/data/protocols/criptography/hasher';
import { Decrypter } from '@/data/protocols/criptography/decrypter';
import { Encrypter } from '@/data/protocols/criptography/encrypter';
import { HashComparer } from '@/data/protocols/criptography/hash-comparer';

export const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return Promise.resolve('any_password');
    }
  }
  return new HasherStub();
};

export const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return Promise.resolve('any_token');
    }
  }

  return new EncrypterStub();
};

export const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string> {
      return Promise.resolve('any_value');
    }
  }

  return new DecrypterStub();
};

export const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }

  return new HashComparerStub();
};
