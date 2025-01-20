import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  public title: string;

  @IsString()
  public category: string;

  @IsBoolean()
  public completed: boolean;

  @IsOptional()
  @IsString()
  public createdAt?: string;

  @IsOptional()
  @IsString()
  public finishDate?: string;
}
