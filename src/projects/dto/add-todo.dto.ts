import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddTodoToProjectDto {
  @IsString({ message: 'Name should be a string' })
  @ApiProperty({ example: 'Do something', description: 'todo name' })
  readonly name: string;

  @IsString({ message: 'Description should be a string' })
  @ApiProperty({ example: '', description: '' })
  readonly description: string;

  @IsNumber()
  @ApiProperty({ example: '3', description: 'High priority' })
  readonly priority:0| 1| 2| 3

  @IsArray({message:"Tags should be an array of tagId"})
  @IsOptional()
  readonly tags?:[number]

  @IsNumber()
  @ApiProperty({ example: 1, description: 'Project id' })
  @IsNotEmpty({message:"ProjectId cannot be empty it should be number"})
  readonly projectId:number
}
