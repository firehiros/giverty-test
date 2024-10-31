import { Global, Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { GivertyController } from './giverty.controller';

// Services
import { GivertyService } from './giverty.service';

// Entities
import { RecipeEntity } from './entities/giverty.entity';


@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([RecipeEntity])
  ],
  controllers: [GivertyController],
  providers: [GivertyService],
  exports: [],
})
export default class UserModule {}
