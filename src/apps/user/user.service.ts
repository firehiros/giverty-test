import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Source
import { LIMIT_PAGE } from '@config/constants';
import { Pagination, encryptPassword, StringUtil } from '@utils/index';
import { MESSAGES, USER_ERROR } from '@messages/index';

// Entity
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

import { QueryTransactionDto } from './dto/query-users.dto';
import * as SampleData from '../../../test/data/users.json';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    // @InjectRepository(Language)
    // private readonly languageRepository: Repository<Language>,
  ) {}

  async onModuleInit() {
    try {
      this.userRepo.save(SampleData as unknown as UserEntity);
    } catch (ex) {
      console.error(ex);
    }
  }

  async list(dto: QueryTransactionDto): Promise<Pagination<UserEntity[]>> {
    try {
      const { page = 1, search } = dto;
      const skip = (page - 1) * LIMIT_PAGE;

      const query = this.userRepo.createQueryBuilder('users');

      query.select([
        'users.id',
        'users.email',
        'users.firstName',
        'users.lastName',
        'users.createdAt',
      ]);

      if (search) {
        query.where('users.email like :name', {
          name: '%' + search + '%',
        });
      }

      query.orderBy('users.id', 'ASC');
      query.take(LIMIT_PAGE);
      query.skip(skip);

      const transactions = await query.getMany();
      const total = await query.getCount();

      return {
        data: transactions.map((user: UserEntity) => {
          return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
          };
        }) as UserEntity[],
        page,
        pageSize: LIMIT_PAGE,
        totalPage: Math.ceil(total / LIMIT_PAGE),
        totalItem: total,
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async find(id: string) {
    try {
      return await this.userRepo.findOne({ where: { id } });
    } catch (e) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async create(dto: CreateUserDto) {
    try {
      const { email } = dto;

      // check valid email
      if (!StringUtil.isValidEmail(email))
        throw new HttpException(
          'Email incorrect. Please try again!',
          HttpStatus.BAD_REQUEST,
        );

      // Check email exists
      const userFound = await this.userRepo.findOneBy({ email });
      if (userFound)
        throw new HttpException(
          USER_ERROR.DUPLICATE_EMAIL,
          HttpStatus.BAD_REQUEST,
        );

      const encryptedPassword = await encryptPassword(dto.password);

      this.userRepo.save({
        ...dto,
        password: encryptedPassword,
      });

      return {
        message: 'Success',
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, param: any) {
    try {
      const userFound = await this.userRepo.findOneBy({ id });

      if (!userFound)
        throw new HttpException(
          USER_ERROR.USER_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );

      await this.userRepo.save({
        id,
        ...param,
      });

      return {
        message: MESSAGES.SUCCESS,
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      return await this.userRepo.softDelete(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Custom Method
  async findUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepo.findOneBy({ email });
  }
}
