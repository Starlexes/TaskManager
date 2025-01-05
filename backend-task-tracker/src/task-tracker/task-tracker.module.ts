import { Module } from '@nestjs/common';
import { TaskTrackerController } from './task-tracker.controller';
import { TaskTrackerService } from './task-tracker.service';
import { TaskModel } from './task-tracker.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TaskModel,
        schemaOptions: {
          collection: 'Task',
        },
      },
    ]),
  ],
  controllers: [TaskTrackerController],
  providers: [TaskTrackerService],
})
export class TaskTrackerModule {}
