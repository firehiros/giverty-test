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
import { ProfileService } from './profile.service';

// Guards

// DTO
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

// Entities:
import { User } from '../user/entities/user.entity';

// Share
import { Pagination } from '@utils/interfaces';
import { GetUser } from '@decorators/index';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async get(@GetUser() user: User) {
    console.log('GET USER', user);
    return this.profileService.find(user);
  }

  // @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async update(@GetUser() user: User, @Body() updateData: UpdateUserDto) {
    return this.profileService.update(user.id, updateData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('change-password')
  async changePassword(
    @GetUser() userId: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.profileService.changePassword(userId, changePasswordDto);
  }
}
