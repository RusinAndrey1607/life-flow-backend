import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString({ message: 'Name should be a string' })
  @ApiProperty({ example: 'Do something', description: 'todo name' })
  readonly name: string;

  @IsString({ message: 'Description should be a string' })
  @ApiProperty({ example: '', description: '' })
  readonly description: string;

  @ApiProperty({ example: '3', description: 'High priority' })
  readonly priority:0| 1| 2| 3

  @IsArray({message:"Tags should be an array of tagId"})
  @IsOptional()
  readonly tags?:[number]

  
}
