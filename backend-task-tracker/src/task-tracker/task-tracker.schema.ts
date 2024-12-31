import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Task {
  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop()
  completed: boolean;

  @Prop()
  createdAt: string;

  @Prop()
  finishDate: string;
}

export const taskSchema = SchemaFactory.createForClass(Task);
