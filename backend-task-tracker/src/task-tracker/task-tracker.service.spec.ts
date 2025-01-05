import { Test, TestingModule } from '@nestjs/testing';
import { TaskTrackerService } from './task-tracker.service';
import { getModelToken } from '@nestjs/mongoose';
import { INestApplication } from '@nestjs/common';
import { taskSchema } from './task-tracker.model';

describe('TaskTrackerService', () => {
  let taskService: TaskTrackerService;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        TaskTrackerService,
        {
          provide: getModelToken('Task'),
          useValue: { taskSchema },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    taskService = moduleFixture.get<TaskTrackerService>(TaskTrackerService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });
});
