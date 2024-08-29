import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as numeral from 'numeral';

@Injectable()
export class StringUtil {
  /**
   * generates a random string
   * @function genRandomString
   * @param {number} length - Length of the random string.
   */
  public static genRandomString(length: number): string {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  /**
   * @function genRandomNumber
   * @param length
   */
  public static genRandomNumber(length = 3): string {
    let formater = '';
    for (let i = 0; i < length; i++) {
      formater += '0';
    }
    return numeral(Math.ceil(Math.random() * Math.pow(10, length) - 1)).format(
      formater,
    );
  }

  /**
   * generates a random string
   * @function genRandomCodePrefix
   * @param {string} prefix - prefix of the random code.
   * @param {string} length - Length number of the random code.
   */
  public static genRandomCodePrefix(prefix: string, length: number): string {
    return `${prefix}` + this.genRandomNumber(length);
  }

  public static genAccountNumber(): number {
    return Math.floor(10000000 + Math.random() * 90000000);
  }

  public static isValidEmail(email: string) {
    const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    return regex.test(email);
  }
}
