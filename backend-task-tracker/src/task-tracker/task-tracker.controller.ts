import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentType } from '@typegoose/typegoose/lib/types';
import { TaskTrackerService } from './task-tracker.service';
import { TaskModel } from './task-tracker.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { IdValidationPipe } from 'src/pipes/idValidation.pipe';

@Controller('tasks')
export class TaskTrackerController {
  constructor(private readonly taskTrackerService: TaskTrackerService) {}
  @Get()
  async get(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('completed', ParseBoolPipe) completedParam?: boolean,
    @Query('today', ParseBoolPipe) todayParam?: boolean,
  ): Promise<DocumentType<TaskModel>[]> {
    if (typeof completedParam === 'boolean') {
      return this.taskTrackerService.filterByCompleted(page, limit, completedParam);
    } else if (todayParam) {
      return this.taskTrackerService.filterWithTodayDate(page, limit);
    } else return this.taskTrackerService.findAll(page, limit);
  }

  @Get('count')
  async count(@Query('completed', ParseBoolPipe) completed?: boolean) {
    const count = await this.taskTrackerService.getCountTasks(completed);
    return { data: count };
  }

  @Get('search')
  async search(@Query('filter') filter: string) {
    return this.taskTrackerService.searchTasks(filter);
  }

  @Get(':taskId')
  async find(@Param('taskId', IdValidationPipe) taskId: string) {
    return this.taskTrackerService.findOne(taskId);
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() task: CreateTaskDto) {
    return this.taskTrackerService.create(task);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':taskId')
  async patch(@Param('taskId', IdValidationPipe) taskId: string, @Body() task: CreateTaskDto) {
    return this.taskTrackerService.update(taskId, task);
  }

  @Delete(':taskId')
  async delete(@Param('taskId', IdValidationPipe) taskId: string) {
    this.taskTrackerService.delete(taskId);
  }
}
