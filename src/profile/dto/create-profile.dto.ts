import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString({ message: 'Name should be a string' })
  @ApiProperty({ example: 'John Doe', description: 'Name' })
  readonly name: string;

  @IsString({ message: 'UserName should be a string' })
  @ApiProperty({ example: 'johndoe', description: 'Username' })
  readonly username: string;

  @IsString({ message: 'bio should be a string' })
  @ApiProperty({ example: 'Just bio!', description: 'Profile information' ,required:false})
  @IsOptional()
  readonly bio?: string;
  
  @ApiProperty({ example: '', description: 'Upload your file using multipart/form-data. Call it avatar',required:false })
  @IsOptional()
  readonly avatar?: any

  @ApiProperty({ example: '', description: 'Upload your file using multipart/form-data. Call it header',required:false })
  @IsOptional()
  readonly header?: any
}
