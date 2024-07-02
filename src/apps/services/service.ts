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
import ServiceEntity from './entity';

// Sample Data
import * as providerSample from '../../../test/data/provider.json';

@Injectable()
class MainService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepo: Repository<ServiceEntity>,
  ) {}

  async onModuleInit() {
    try {
      // this.serviceRepo.save(providerSample as unknown as ServiceEntity);
    } catch (ex) {
      // Logger.error(ex);
    }
  }

  async findAll(query) {
    try {

      const { page, limit } = query;
      const skip = (page - 1) * LIMIT_PAGE;

      console.log("PRINT", { page, limit })

      const [result, total] = await this.serviceRepo.findAndCount({
        order: { name: 'DESC' },
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
      return await this.serviceRepo.findOne({ where: { id } });
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
      return await this.serviceRepo.softDelete(id);
    } catch (e) {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
  }
}

export default MainService