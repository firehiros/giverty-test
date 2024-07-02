import { Like, Repository } from 'typeorm';
import {
  Injectable,
  forwardRef,
  Inject,
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Source
import { LIMIT_PAGE } from '../../configs/constant.config';
import { CreateDto, UpdateDto } from './dto';
import MainEntity from './entity/site_config.entity';

// Sample Data
import * as SampleData from '../../../test/data/site_config.json';

@Injectable()
class MainService {
  constructor(
    @InjectRepository(MainEntity)
    private readonly mainRepo: Repository<MainEntity>,
  ) {}

  async onModuleInit() {
    try {
      // this.mainRepo.save(SampleData as unknown as MainEntity);
    } catch (ex) {
      console.error(ex);
    }
  }

  async find() {
    try {
      // return await this.mainRepo.find({
      //   relations: ['provider'],
      // });
      return await this.mainRepo.findOne({
        relations: ['provider'],
        where: {
          provider: {
            slug: 'banchanxanh.com',
          },
        },
      });
    } catch (e) {
      throw new HttpException('Error' + e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(dto: UpdateDto) {
    try {
      const result = this.mainRepo.save(dto);

      return result;
    } catch (e) {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
  }
}

export default MainService;
