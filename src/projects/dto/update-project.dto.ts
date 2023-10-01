import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
  // @IsNumber()
  @IsNotEmpty({message:"ProjectId should be a number and cannot be empty"})
  @ApiProperty({ example: '1', description: 'ProjectId' })
  readonly projectId:number

  @IsString({ message: 'Name should be a string' })
  @ApiProperty({ example: 'Project Name # 1', description: 'Project Name' })
  @IsOptional()
  readonly name?: string;

  @IsString({ message: 'Description should be a string' })
  @ApiProperty({ example: 'project description', description: 'Project information' ,required:false})
  @IsOptional()
  readonly description?: string;
  
  @ApiProperty({ example: '', description: 'Upload your file using multipart/form-data. Call it header',required:false })
  @IsOptional()
  readonly header?: any
}
