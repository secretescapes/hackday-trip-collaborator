import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseUtilsService {

  constructor() { }

  sanitizeKey(key: string): string {
    if (!key) {
      return key;
    }
    let newKey = key;
    const mapping = {
      '.': '<>d',
      '$': '<>s',
      '#': '<>p',
      '[': '<>o',
      ']': '<>c',
      '/': '<>S'
    };

    for (let i = 0; i < Object.keys(mapping).length; i++ ) {
      const c = Object.keys(mapping)[i];
      newKey = newKey.split(Object.keys(mapping)[i]).join(mapping[c]);
    }
    return newKey;
  }
}
