import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Tag } from './tags.model';
import { AuthModule } from 'src/auth/auth.module';
import { TagTodos } from './todo-tag.model';
import { Todo } from 'src/todos/todo.model';

@Module({
  providers: [TagsService],
  controllers: [TagsController],
  imports:[
    SequelizeModule.forFeature([User,Tag,TagTodos,Todo]),
    AuthModule
  ]
})
export class TagsModule {}
