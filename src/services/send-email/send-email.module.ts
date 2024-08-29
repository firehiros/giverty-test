import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendEmailService } from './send-email.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  exports: [SendEmailService],
  providers: [SendEmailService],
})
export class SendEmailModule {}
