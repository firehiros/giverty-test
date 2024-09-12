import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Delete,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

// Services
import { UserService } from './user.service';

// Guards

// DTO
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryTransactionDto } from './dto/query-users.dto';

// Entities:
import { UserEntity } from './entities/user.entity';

// Share
import { CreateUserDto } from './dto/create-user.dto';
import { Pagination } from '@utils/interfaces';
import { GetUser } from '@decorators/index';
import { AuthGuard } from '@nestjs/passport';
// import { IUserPayload } from '@share/common/app.interface';
// import { AffiliateService } from 'src/affiliate/affiliate.service';
// import { QueryAffiliateDto } from 'src/affiliate/dto/query-affiliate .dto';
// import { UpdateCommissionDto } from 'src/affiliate/dto/update-commision.dto';
// import { ChangeInvitationDto } from './dto/change-invitation.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(200)
  async list(@Query() query: QueryTransactionDto) {
    return this.userService.list(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(200)
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @HttpCode(200)
  find(@Param('id') id: string) {
    return this.userService.find(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateUserDto) {
    return this.userService.update(id, updateData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
