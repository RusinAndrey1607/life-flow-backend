import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Tag } from './tags.model';
import { CreateTagDto } from './dto/create-tag.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateTagDto } from './dto/update-tag.dto';

@ApiTags("Tags")
@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  //Tag creation
  @ApiResponse({
    status: 200,
    description: 'Create Tag endpoint',
    type: Tag,
  })
  @ApiOperation({
    summary: 'Tag Creation',
  })
  @ApiSecurity('JWT-AUTH')
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() dto: CreateTagDto, @Req() req: Request) {
    //@ts-ignore
    const userId = req.user.id;
    return this.tagService.createTag(userId, dto);
  }

  //Get tags
  @ApiResponse({
    status: 200,
    description: 'Get Tags endpoint',
    type: [Tag],
  })
  @ApiOperation({
    summary: 'Get Tags',
  })
  @ApiSecurity('JWT-AUTH')
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getTagsByUserId(@Req() req: Request) {
    //@ts-ignore
    const userId = req.user.id;
    return this.tagService.getTagsByUserId(userId);
  }

  //Update Tag
  @ApiResponse({
    status: 200,
    description: 'Update Tag endpoint',
    type: Tag,
  })
  @ApiOperation({
    summary: 'Tag update',
  })
  @ApiSecurity('JWT-AUTH')
  @UseGuards(JwtAuthGuard)
  @Put("/update")
  update(@Body() dto: UpdateTagDto, @Req() req: Request) {
    //@ts-ignore
    const userId = req.user.id;
    return this.tagService.updateTag(userId, dto)
  }

  //Delete Tag
  @ApiResponse({
    status: 200,
    description: 'Delete Tag endpoint',
  })
  @ApiOperation({
    summary: 'Tag Delete',
  })
  @ApiSecurity('JWT-AUTH')
  @UseGuards(JwtAuthGuard)
  @Delete('/:tagId')
  deleteTag(@Req() req: Request, @Param('tagId') tagId: number) {
    //@ts-ignore
    const userId = req.user.id;
    return this.tagService.deleteTag(userId, tagId);
  }

}
