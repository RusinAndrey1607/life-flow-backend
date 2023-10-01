import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.model';
import { Tag } from 'src/tags/tags.model';
import { Todo } from './todo.model';
import { TagTodos } from 'src/tags/todo-tag.model';
import { Project } from 'src/projects/project.model';

@Module({
  providers: [TodosService],
  controllers:[TodosController],
  imports:[
    SequelizeModule.forFeature([User,Todo,Tag,TagTodos,Project]),
    AuthModule
  ],
  exports:[TodosService]
})
export class TodosModule {}
