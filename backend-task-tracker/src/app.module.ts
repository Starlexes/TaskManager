import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskTrackerModule } from './task-tracker/task-tracker.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/task-manager'), TaskTrackerModule],
})
export class AppModule {}
