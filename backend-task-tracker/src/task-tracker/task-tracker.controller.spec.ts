import { Test, TestingModule } from '@nestjs/testing';
import { TaskTrackerController } from './task-tracker.controller';
import { INestApplication } from '@nestjs/common';
import { TaskTrackerService } from './task-tracker.service';
import { getModelToken } from '@nestjs/mongoose';
import { taskSchema } from './task-tracker.model';
import { Task } from './types/task-tracker.interface';
import { DocumentType } from '@typegoose/typegoose/lib/types';
describe('TaskTrackerController', () => {
  let controller: TaskTrackerController;
  let service: TaskTrackerService;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TaskTrackerController],
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

    controller = moduleFixture.get<TaskTrackerController>(TaskTrackerController);
    service = moduleFixture.get<TaskTrackerService>(TaskTrackerService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('findTasks', () => {
    it('should return an array of tasks', async () => {
      const testTasks: Task[] = [
        {
          title: 'Прочитать книгу по саморазвитию',
          category: 'личная жизнь',
          completed: true,
          createdAt: new Date().toISOString(),
          finishDate: new Date().toISOString(),
        },
        {
          title: 'Подготовиться к собеседованию',
          category: 'карьера',
          completed: false,
          createdAt: new Date().toISOString(),
          finishDate: null,
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(testTasks as DocumentType<Task>[]);
      const result = await controller.findTasks();
      expect(result).toEqual(testTasks);
    });
  });

  describe('findTask', () => {
    it('should return a task by Id', async () => {
      const taskId = '673051604c25bbf27ed51c38';
      const testTask: Task = {
        title: 'Прочитать книгу по саморазвитию',
        category: 'личная жизнь',
        completed: true,
        createdAt: new Date().toISOString(),
        finishDate: new Date().toISOString(),
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(testTask as DocumentType<Task>);

      expect(await controller.findTask(taskId)).toEqual(testTask);
    });
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
