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
import { Pagination, encryptPassword } from '@utils/index';

// Entity
import { User } from './entities/user.entity';
// import { Language } from './entities/language.entity';

// Services

// DTO
import { SignInDto } from '../auth/dto/signin.dto';
import { SendMailDto } from './dto/send-mail.dto';
import { ChangeEmailDto } from './dto/change-email.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SignUpDto } from '../auth/dto/signup.dto';

// Share
import { StringUtil } from '@utils/index';

import { LanguageData } from './data/language';
import { USER_ERROR } from '@messages/user';
import { QueryTransactionDto } from './dto/query-users.dto';
import * as SampleData from '../../../test/data/users.json';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    // @InjectRepository(Language)
    // private readonly languageRepository: Repository<Language>,
  ) {}

  async onModuleInit() {
    try {
      this.userRepo.save(SampleData as unknown as User);
    } catch (ex) {
      console.error(ex);
    }
  }

  async list(dto: QueryTransactionDto): Promise<Pagination<User[]>> {
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

      query.orderBy('users.createdAt', 'DESC');
      query.take(LIMIT_PAGE);
      query.skip(skip);

      const transactions = await query.getMany();
      const total = await query.getCount();

      return {
        data: transactions.map((user: User) => {
          return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
          };
        }) as User[],
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

      const newUser = this.userRepo.create({
        email,
        password: encryptedPassword,
      });

      return 'Success';
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, param: any) {
    const result = await this.userRepo.save({
      id,
      ...param,
    });
    return result;
  }

  async remove(id: string) {
    try {
      return await this.userRepo.softDelete(id);
    } catch (e) {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
  }

  // Custom Method
  async findUserByEmail(email: string): Promise<User> {
    return this.userRepo.findOneBy({ email });
  }
}
