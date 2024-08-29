import { Inject, Injectable } from '@nestjs/common';
import * as RedisClient from 'ioredis';

@Injectable()
export class RedisService {
  private connection: RedisClient.Redis;

  constructor(@Inject('REDIS_CONNECTION') connection: RedisClient.Redis) {
    this.connection = connection;
  }

  async getValueByKey(key: any) {
    return new Promise((resolve, reject) => {
      this.connection.get(key, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }

  async setValueByKey(key: any, value: any, exp: any) {
    return new Promise((resolve, reject) => {
      this.connection.set(key, value, 'EX', exp, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }

  async deleteValueByKey(key: any) {
    const keyDel = await this.connection.del(key);
    return keyDel;
  }

  /**
   * Set method
   * @param {string} key
   * @param {string} value
   */
  public set(key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.connection.set(key, value, (err: Error) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  /**
   * Set Expiration method
   * @param {string} key
   * @param {string} value
   * @param {string} mode
   * @param {number} duration
   */
  public setExpire(
    key: string,
    value: string,
    mode: string,
    duration: number,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      // return this.connection.set(key, value, mode, duration, (err: Error) => {
      //   if (err) {
      //     reject(err);
      //   }
      //   resolve();
      // });
    });
  }

  /**
   * Delete method
   * @param {string} key
   */
  public del(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.connection.del(key, (err: Error) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  /**
   * Get method
   * @param {string} key
   */
  public get(key: string): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      return this.connection.get(key, (err: Error | null, reply: any) => {
        if (err) {
          reject(err);
        }
        resolve(reply);
      });
    });
  }
}
