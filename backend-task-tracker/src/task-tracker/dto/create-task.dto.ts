import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Неправильный формат данных у атрибута title' })
  public title: string;

  @IsString({ message: 'Неправильный формат данных у атрибута category' })
  public category: string;

  @IsBoolean({ message: 'Неправильный формат данных у атрибута completed' })
  public completed: boolean;

  @IsOptional()
  @IsString({ message: 'Неправильный формат данных у атрибута createdAt' })
  public createdAt?: string;

  @IsOptional()
  @IsString({ message: 'Неправильный формат данных у атрибута finishDate' })
  public finishDate?: string;
}
