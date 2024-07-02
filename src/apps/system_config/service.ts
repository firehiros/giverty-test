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
import { SystemConfigEntity } from './entity/system_config.entity';

// Sample Data
import * as mainSample from '../../../test/data/system_config.json';

@Injectable()
class MainService {
  constructor(
    @InjectRepository(SystemConfigEntity)
    private readonly mainRepo: Repository<SystemConfigEntity>,
  ) {}

  async onModuleInit() {
    try {
      this.mainRepo.save(mainSample as unknown as SystemConfigEntity);
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
      // const result = this.mainRepo.save(dto);

      // return result;
      return 'update';
    } catch (e) {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
  }
}

export default MainService;
