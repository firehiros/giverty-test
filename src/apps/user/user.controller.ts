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
import { ChangeEmailDto } from './dto/change-email.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { QueryTransactionDto } from './dto/query-users.dto';

// Entities:
import { User } from './entities/user.entity';

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

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('basic'))
  @Get('users')
  @HttpCode(200)
  async list(@Query() query: QueryTransactionDto) {
    return this.userService.list(query);
  }

  @UseGuards(AuthGuard('basic'))
  @Post('users')
  @HttpCode(200)
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @UseGuards(AuthGuard('basic'))
  @Get('users/:id')
  @HttpCode(200)
  find(@Param('id') id: string) {
    return this.userService.find(id);
  }

  @UseGuards(AuthGuard('basic'))
  @Put('users/:id')
  update(@Param('id') id: string, @Body() updateData: UpdateUserDto) {
    return this.userService.update(id, updateData);
  }

  @UseGuards(AuthGuard('basic'))
  @Delete('users/:id')
  @HttpCode(200)
  delete(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
