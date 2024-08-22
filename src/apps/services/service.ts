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
import ServiceEntity from './entity/index.entity';

// Sample Data
import * as SampleData from '../../../test/data/services.json';

@Injectable()
class MainService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly mainRepo: Repository<ServiceEntity>,
  ) {}

  async onModuleInit() {
    try {
      this.mainRepo.save(SampleData as unknown as ServiceEntity);
    } catch (ex) {
      console.error(ex);
    }
  }

  async findAll(query) {
    try {
      const { page = 1, limit } = query;
      const skip = (page - 1) * LIMIT_PAGE;

      const [result, total] = await this.mainRepo.findAndCount({
        order: { key: 'DESC' },
        take: limit,
        skip: skip,
      });

      return {
        data: result,
        page,
        pageSize: LIMIT_PAGE,
        totalPage: Math.ceil(total / LIMIT_PAGE),
        totalItem: total,
      };
    } catch (e) {
      throw new HttpException('Error:' + e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      return await this.mainRepo.findOne({ where: { id } });
    } catch (e) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async create(dto: CreateDto) {
    try {
      return {
        message: 'success',
      };
    } catch (e) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, dto: UpdateDto) {
    try {
      return {
        message: 'success',
      };
    } catch (e) {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      return await this.mainRepo.softDelete(id);
    } catch (e) {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
  }
}

export default MainService;
