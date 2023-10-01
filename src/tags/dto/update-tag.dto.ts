import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTagDto {
  @IsNumber()
  @ApiProperty({ example: 1, description: 'tagId' })
  readonly id: number

  @IsString({ message: 'Name should be a string' })
  @IsOptional()
  @ApiProperty({ example: 'Sport', description: 'tagName' })
  readonly name?: string;

  @IsString({ message: 'Color should be a string, hex or rgb' })
  @IsOptional()
  @ApiProperty({ example: '#000', description: 'Tag color' })
  readonly color?: string;
}
