/**
 * @module Recaptcha
 * @description Verify recaptcha
 * @version 1.0.0
 */
import { HttpService } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { RECAPTCHA_CONFIG } from '@config/constants';

const httpService = new HttpService();
const graphUri = 'https://www.google.com/recaptcha/api/siteverify';

export class RecaptchaService {
  private responseKey: string;

  constructor(_responseKey: string) {
    this.responseKey = _responseKey;
  }

  /**
   * @method Verify
   * @description Verify recaptcha with response key from FE
   */

  async verify(): Promise<any> {
    if (RECAPTCHA_CONFIG.IS_DISABLED) {
      return true;
    }

    const url = `${graphUri}?secret=${RECAPTCHA_CONFIG.SECRET_KEY}&response=${this.responseKey}`;
    const $responseService = httpService
      .post(url)
      .pipe(
        catchError((e) => {
          throw new HttpException(e?.response?.data, e?.response?.status);
        }),
      )
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
    const response = await lastValueFrom($responseService);
    return response.success;
  }
}
