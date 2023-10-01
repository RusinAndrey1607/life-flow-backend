import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsNumber()
  @ApiProperty({ example: '1', description: 'todoId' })
  readonly todoId: number;

  @IsString({ message: 'Name should be a string' })
  @IsOptional()
  @ApiProperty({ example: 'Do something', description: 'todo name' })
  readonly name?: string;

  @IsString({ message: 'Description should be a string' })
  @IsOptional()
  @ApiProperty({ example: '', description: '' })
  readonly description?: string;

  @ApiProperty({ example: '3', description: 'High priority' })
  @IsOptional()
  readonly priority?:0| 1| 2| 3

  @IsArray({message:"Tags should be an array of tagId"})
  @IsOptional()
  readonly tags?:[number]

  @ApiProperty({ example: 'True', description: 'Complete' })
  @IsBoolean({message:"status should be boolean type"})
  @IsOptional()
  readonly status?:boolean
} 
