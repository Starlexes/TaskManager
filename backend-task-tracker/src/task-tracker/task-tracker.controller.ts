import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { TaskTrackerService } from './task-tracker.service';
import { TaskModel } from './task-tracker.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TaskTrackerController {
  constructor(private readonly taskTrackerService: TaskTrackerService) {}
  @Get()
  async get(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('completed') completedParam?: string,
    @Query('today') todayParam?: string,
  ): Promise<DocumentType<TaskModel>[]> {
    if (completedParam === 'true' || completedParam === 'false') {
      const completed = completedParam === 'true';
      return this.taskTrackerService.filterByCompleted(page, limit, completed);
    } else if (todayParam === 'true') {
      return this.taskTrackerService.filterWithTodayDate(page, limit);
    } else return this.taskTrackerService.findAll(page, limit);
  }

  @Get('count')
  async count(@Query('completed') completed?: boolean) {
    const count = await this.taskTrackerService.getCountTasks(completed);
    return { data: count };
  }

  @Get('search')
  async search(@Query('filter') filter: string) {
    return this.taskTrackerService.searchTasks(filter);
  }

  @Get(':taskId')
  async find(@Param('taskId') taskId: string) {
    return this.taskTrackerService.findOne(taskId);
  }

  @Post('create')
  async create(@Body() task: TaskModel) {
    return this.taskTrackerService.create(task);
  }

  @Patch(':taskId')
  async patch(@Param('taskId') taskId: string, @Body() task: CreateTaskDto) {
    return this.taskTrackerService.update(taskId, task);
  }

  @Delete(':taskId')
  async delete(@Param('taskId') taskId: string) {
    this.taskTrackerService.delete(taskId);
  }
}
