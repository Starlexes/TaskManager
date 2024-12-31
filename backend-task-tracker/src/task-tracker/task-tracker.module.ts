import { Module } from '@nestjs/common';
import { TaskTrackerController } from './task-tracker.controller';
import { TaskTrackerService } from './task-tracker.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, taskSchema } from './task-tracker.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: taskSchema }])],
  controllers: [TaskTrackerController],
  providers: [TaskTrackerService],
})
export class TaskTrackerModule {}
