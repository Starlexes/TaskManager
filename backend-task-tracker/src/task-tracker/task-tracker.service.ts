import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateTask } from './types/task-tracker.interface';
import { RootFilterQuery, Types } from 'mongoose';
import { TaskModel } from './task-tracker.model';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { getCurrentDate } from '../utils/getCurrentDate';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class TaskTrackerService {
  constructor(
    @InjectModel(TaskModel)
    private readonly taskModel: ModelType<TaskModel>,
  ) {}

  private async findWithPagination(
    filter: RootFilterQuery<TaskModel>,
    page: number,
    limit: number,
  ): Promise<DocumentType<TaskModel>[]> {
    const skip = (page - 1) * limit;

    return this.taskModel
      .find<DocumentType<TaskModel>>(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findAll(page: number, limit: number): Promise<DocumentType<TaskModel>[]> {
    return this.findWithPagination({}, page, limit);
  }

  async filterByCompleted(
    page: number,
    limit: number,
    completed: boolean,
  ): Promise<DocumentType<TaskModel>[]> {
    return this.findWithPagination({ completed }, page, limit);
  }

  async filterWithTodayDate(page: number, limit: number): Promise<DocumentType<TaskModel>[]> {
    const today = getCurrentDate();

    return this.findWithPagination(
      {
        finishDate: {
          $eq: new Date(today.setUTCHours(0, 0, 0, 0)).toISOString(),
        },
      },
      page,
      limit,
    );
  }

  async searchTasks(filter: string): Promise<TaskModel[]> {
    const regex = new RegExp(filter, 'i');
    return this.taskModel
      .find({
        $or: [{ title: { $regex: regex } }, { category: { $regex: regex } }],
      })
      .exec();
  }

  async findOne(taskId: string): Promise<DocumentType<TaskModel>> {
    const task = this.taskModel
      .findOne<DocumentType<TaskModel>>({ _id: new Types.ObjectId(taskId) })
      .exec();
    if (!task) {
      throw new HttpException(`Задача с ID "${taskId}" не найдена`, HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async getCountTasks(completed?: TaskModel['completed']): Promise<number> {
    try {
      const count = await this.taskModel.countDocuments(completed ? { completed } : {});
      return count;
    } catch (e) {
      console.error(e);
    }
  }

  async create(task: TaskModel): Promise<DocumentType<TaskModel>> {
    task.createdAt = getCurrentDate().toISOString();
    return this.taskModel.create<DocumentType<TaskModel>>(task);
  }

  async update(taskId: UpdateTask['_id'], task: UpdateTask): Promise<DocumentType<TaskModel>> {
    return this.taskModel
      .findByIdAndUpdate<DocumentType<TaskModel>>(taskId, task, { new: true })
      .exec();
  }

  async delete(taskId: string): Promise<DocumentType<TaskModel> | null> {
    if (!Types.ObjectId.isValid(taskId)) {
      throw new HttpException(`ID ${taskId} не корректен`, HttpStatus.BAD_REQUEST);
    }
    return this.taskModel
      .findByIdAndDelete<DocumentType<TaskModel>>(new Types.ObjectId(taskId))
      .exec();
  }
}
