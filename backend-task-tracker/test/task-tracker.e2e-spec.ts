import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateTaskDto } from 'src/task-tracker/dto/create-task.dto';
import { disconnect, Types } from 'mongoose';
import { TASK_NOT_FOUND } from '../src/task-tracker/task-tracker.constants';
import { ID_VALIDATION_ERROR } from '../src/constants/idValidationError.constants';
import { getCurrentDate } from '../src/utils/getCurrentDate';

const testDto: CreateTaskDto = {
  title: 'Test title',
  category: 'test',
  completed: true,
  finishDate: new Date(getCurrentDate().setUTCHours(0, 0, 0, 0)).toISOString(),
};

const testUpdatedTitle = 'Updated title';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tasks/create/ (POST) - success', async () => {
    const response = await request(app.getHttpServer())
      .post('/tasks/create')
      .send(testDto)
      .expect(201);

    createdId = response.body._id;
    expect(createdId).toBeDefined();
  });

  it('/tasks/create/ (POST) - fail', async () => {
    await request(app.getHttpServer())
      .post('/tasks/create')
      .send({ ...testDto, title: 1 })
      .expect(400);
  });

  it('/tasks/:taskId/ (GET) - success (by id)', async () => {
    return request(app.getHttpServer())
      .get('/tasks/' + createdId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
      });
  });

  it('/tasks/completed/ (GET) - success (by completed)', async () => {
    return request(app.getHttpServer())
      .get('/tasks/completed/')
      .query({ completed: true })
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBeGreaterThanOrEqual(1);
      });
  });

  it('/tasks/today/ (GET) - success (by today)', async () => {
    return request(app.getHttpServer())
      .get('/tasks/today/')
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBeGreaterThanOrEqual(1);
      });
  });

  it('/tasks/:taskId/ (GET) - fail (not found)', async () => {
    return request(app.getHttpServer())
      .get('/tasks/' + new Types.ObjectId().toHexString())
      .expect(404, {
        statusCode: 404,
        message: TASK_NOT_FOUND,
      });
  });

  it('/tasks/:taskId/ (GET) - fail (bad id)', async () => {
    return request(app.getHttpServer())
      .get('/tasks/' + 'abc')
      .expect(400, {
        statusCode: 400,
        message: ID_VALIDATION_ERROR,
      });
  });

  it('/tasks/:taskId/ (PATCH) - success', async () => {
    return request(app.getHttpServer())
      .patch('/tasks/' + createdId)
      .send({ ...testDto, completed: false, title: testUpdatedTitle })
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.completed).toBe(false);
        expect(body.title).toBe(testUpdatedTitle);
      });
  });

  it('/tasks/:taskId/ (PATCH) - fail', async () => {
    return request(app.getHttpServer())
      .patch('/tasks/' + new Types.ObjectId().toHexString())
      .send({ ...testDto, completed: false, title: testUpdatedTitle })
      .expect(404, {
        statusCode: 404,
        message: TASK_NOT_FOUND,
      });
  });

  it('/tasks/:taskId/ (DELETE) - success', async () => {
    return request(app.getHttpServer())
      .delete('/tasks/' + createdId)
      .expect(200);
  });

  it('/tasks/:taskId/ (DELETE) - fail (not found)', async () => {
    return request(app.getHttpServer())
      .delete('/tasks/' + new Types.ObjectId().toHexString())
      .expect(404, {
        statusCode: 404,
        message: TASK_NOT_FOUND,
      });
  });

  it('/tasks/:taskId/ (DELETE) - fail (not deleted)', async () => {
    return request(app.getHttpServer())
      .delete('/tasks/' + 'abc')
      .expect(400, {
        statusCode: 400,
        message: ID_VALIDATION_ERROR,
      });
  });

  afterAll(() => {
    disconnect();
  });
});
