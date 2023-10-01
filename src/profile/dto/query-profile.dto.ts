import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryProfileDto {
  @IsString({ message: 'Name should be a string' })
  @ApiProperty({ example: 'John', description: 'Name' })
  @IsOptional()
  readonly name?: string;

  @IsString({ message: 'UserName should be a string' })
  @ApiProperty({ example: 'johndoe', description: 'Username' })
  @IsOptional()
  readonly username?: string;

  @IsNumber()
  @ApiProperty({ example: 10, description: 'Limit' })
  @IsOptional()
  readonly limit?: number;

  @IsNumber()
  @ApiProperty({ example: 10, description: 'Offset' })
  @IsOptional()
  readonly offset?: number;
}
