import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from './home.controller';

describe('AppController', () => {
  let appController: HomeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [],
    }).compile();

    appController = app.get<HomeController>(HomeController);
  });

  describe('root', () => {
    it('should return "Pong"', () => {
      expect(appController.getPing()).toBe('Pong');
    });
  });
});
