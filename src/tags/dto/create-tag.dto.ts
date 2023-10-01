import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTagDto {
  @IsString({ message: 'Name should be a string' })
  @ApiProperty({ example: 'Sport', description: 'tagName' })
  readonly name: string;

  @IsString({ message: 'Color should be a string, hex or rgb' })
  @ApiProperty({ example: '#000', description: 'Tag color' })
  readonly color: string;
}
