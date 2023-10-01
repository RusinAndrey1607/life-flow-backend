import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString({ message: 'Name should be a string' })
  @ApiProperty({ example: 'Project Name # 1', description: 'Project Name' })
  readonly name: string;

  @IsString({ message: 'Description should be a string' })
  @ApiProperty({ example: 'project description', description: 'Project information' ,required:false})
  @IsOptional()
  readonly description?: string;
  
  @ApiProperty({ example: '', description: 'Upload your file using multipart/form-data. Call it header',required:false })
  @IsOptional()
  readonly header?: any
}
