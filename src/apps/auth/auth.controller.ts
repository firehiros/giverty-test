import { response, Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Resource
import { GetUser } from '@decorators/index';
import { User } from '@apps/user/entities/user.entity';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { CheckEmailDto } from './dto/check-email.dto';
import { TwoFaDto } from './dto/two-fa.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(AuthGuard('basic'))
  login(@GetUser() user: User, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(user, response);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  // @Post('/signup')
  // signUp(@Body() signupDto: SignUpDto): Promise<any> {
  //   return this.authService.signUp(signupDto);
  // }

  // @Post('check-email')
  // checkEmail(@Body() checkEmailDto: CheckEmailDto) {
  //   return this.authService.checkEmailExits(checkEmailDto.email);
  // }

  // @Post('forgot-password')
  // async forgotPasswordRequest(@Body() dto: ForgotPasswordDto) {
  //   return this.authService.forgotPasswordRequest(dto);
  // }

  // @Post('reset-password')
  // async resetPassword(
  //   @Query('emailToken') emailToken: string,
  //   @Body() body: ResetPasswordDto,
  // ) {
  //   //get-instance
  //   return this.authService.resetPassword(emailToken, body);
  // }

  // @Get('verify-url')
  // async verifyForgotPasswordURL(@Query('emailToken') emailToken: string) {
  //   return this.authService.verifyForgotPasswordURL(emailToken);
  // }

  // @Post('/verify/:id')
  // verify(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.authService.verify(id);
  // }

  // @ApiBearerAuth()
  // @ApiOkResponse({
  //   status: 200,
  //   description: 'Return Qr code imageVe',
  // })
  // @Get('qr-code-image')
  // @UseGuards(JwtAuthGuard)
  // @HttpCode(HttpStatus.OK)
  // getQrImageCode(@GetUser() user: IUserPayload) {
  //   return this.authService.getQrImageCode(user);
  // }

  // @ApiBearerAuth()
  // @ApiOkResponse({
  //   status: 200,
  //   description: 'Return Success after enabled 2fa in settings',
  // })
  // @UseGuards(JwtAuthGuard)
  // @HttpCode(HttpStatus.OK)
  // @Post('enabled-2fa')
  // enabled2Fa(@GetUser() user: IUserPayload, @Body() dto: TwoFaDto) {
  //   return this.authService.enabled2Fa(user, dto);
  // }

  // @ApiOkResponse({
  //   status: 200,
  //   description: 'Return user and token after verify 2fa',
  // })
  // @HttpCode(HttpStatus.OK)
  // @Post('verify-2fa/:id')
  // verify2fa(@Body() dto: TwoFaDto, @Param('id', ParseUUIDPipe) id: string) {
  //   return this.authService.verify2FaAfterLogin(id, dto);
  // }
}
