import { Like, Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Source
import { LIMIT_PAGE } from '../../config/constants';
import { CreateDto, UpdateDto, QueryDto } from './dto';
import { PageMetadataEntity } from './entity/page_metadata.entity';

// Sample Data
import { MESSAGES } from '@messages/index';

@Injectable()
class MainService {
  constructor(
    @InjectRepository(PageMetadataEntity)
    private readonly mainRepo: Repository<PageMetadataEntity>,
  ) {}

  async onModuleInit() {
    try {
    } catch (ex) {
      console.error(ex);
    }
  }

  async findAll(pageId: string, query: QueryDto) {
    try {
      const { page = 1, limit } = query;
      const skip = (page - 1) * LIMIT_PAGE;

      const [result, total] = await this.mainRepo.findAndCount({
        where: {
          page: {
            id: pageId,
          },
        },
        order: { key: 'ASC' },
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

  async findOne(pageId: string, id: string) {
    try {
      return await this.mainRepo.findOne({
        where: {
          id,
          page: { id: pageId },
        },
      });
    } catch (e) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async create(pageId: string, dto: CreateDto) {
    try {
      await this.mainRepo.save({ ...dto, page: { id: pageId } });

      return {
        message: MESSAGES.SUCCESS,
      };
    } catch (e) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async update(pageId: string, id: string, dto: UpdateDto) {
    try {
      const entityFound = await this.mainRepo.findOneBy({ id });

      if (!entityFound)
        throw new HttpException(
          MESSAGES.MSG_NOT_FOUND('Page Tags'),
          HttpStatus.BAD_REQUEST,
        );

      await this.mainRepo.save({
        id,
        ...dto,
        page_id: pageId,
      });

      return {
        message: MESSAGES.SUCCESS,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      await this.mainRepo.delete(id);

      return {
        message: MESSAGES.SUCCESS,
      };
    } catch (e) {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
  }
}

export default MainService;
