import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './tags.model';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag) private readonly tagRepository: typeof Tag) {}

  async createTag(userId: number, dto: CreateTagDto) {
    const tag = await this.tagRepository.create({
      ...dto,
      userId,
    });
    return tag;
  }

  async getTagsByUserId(userId: number) {
    const tags = await this.tagRepository.findAll({
      where: {
        userId,
      },
    });
    return tags;
  }
  async deleteTag(userId: number, tagId: number) {
    const deletedTag = await this.tagRepository.destroy({
      where: {
        id: tagId,
        userId,
      },
    });
    return deletedTag;
  }
  async updateTag(userId: number, dto: UpdateTagDto) {
    const tag = await this.tagRepository.update(
      {
        ...dto,
      },
      {
        where: {
          userId,
          id: dto.id,
        },
        returning:true,
        
      },
    );
    return tag[1][0];
  }
}
