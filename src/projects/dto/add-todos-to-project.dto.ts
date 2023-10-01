import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddTodosToProjectDto {
  @IsNumber()
  @ApiProperty({ example: 1, description: 'Project id' })
  @IsNotEmpty({message:"ProjectId cannot be empty it should be number"})
  readonly projectId:number

  @ApiProperty({ example: [1,2,3,4], description: 'Array of todoId' })
  @IsArray({message:"Todos must be an array of todoId"})
  readonly todos:[number]
}
