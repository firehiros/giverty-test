import { Test, TestingModule } from '@nestjs/testing';
import { ProviderController } from './controller';
import { ProviderService } from './service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ProviderController],
      providers: [ProviderService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get(ProviderController);
      expect(appController.findAll()).toBe('Hello World!');
    });
  });
});
