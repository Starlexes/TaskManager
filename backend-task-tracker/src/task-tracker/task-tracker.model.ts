import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class TaskModel {
  public _id: Types.ObjectId;

  @prop()
  public title: string;

  @prop()
  public category: string;

  @prop({ default: false })
  public completed: boolean;

  @prop()
  public createdAt: string;

  @prop()
  public finishDate?: string;
}
