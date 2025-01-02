import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { TaskTrackerService } from './task-tracker.service';
import { Task } from './task-tracker.schema';
import { UpdateTask } from './types/task-tracker.interface';

@Controller('tasks')
export class TaskTrackerController {
  constructor(private readonly taskTrackerService: TaskTrackerService) {}
  @Get()
  async findTasks(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('completed') completedParam?: string,
    @Query('today') todayParam?: string,
  ): Promise<DocumentType<Task>[]> {
    if (completedParam === 'true' || completedParam === 'false') {
      const completed = completedParam === 'true';
      return this.taskTrackerService.filterByCompleted(page, limit, completed);
    } else if (todayParam === 'true') {
      return this.taskTrackerService.filterWithTodayDate(page, limit);
    } else return this.taskTrackerService.findAll(page, limit);
  }

  @Get('count')
  async getCountTasks(@Query('completed') completed?: boolean) {
    const count = await this.taskTrackerService.getCountTasks(completed);
    return { data: count };
  }

  @Get('search')
  async searchTasks(@Query('filter') filter: string) {
    return this.taskTrackerService.searchTasks(filter);
  }

  @Get(':taskId')
  async findTask(@Param('taskId') taskId: string) {
    return this.taskTrackerService.findOne(taskId);
  }

  @Post()
  async create(@Body() task: Task) {
    return this.taskTrackerService.create(task);
  }

  @Patch(':taskId')
  async update(@Param('taskId') taskId: UpdateTask['_id'], @Body() task: UpdateTask) {
    return this.taskTrackerService.update(taskId, task);
  }

  @Delete(':taskId')
  async delete(@Param('taskId') taskId: UpdateTask['_id']) {
    this.taskTrackerService.delete(taskId);
  }
}
