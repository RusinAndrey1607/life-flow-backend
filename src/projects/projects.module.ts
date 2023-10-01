import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from 'src/todos/todo.model';
import { User } from 'src/users/users.model';
import { Project } from './project.model';
import { FilesModule } from 'src/files/files.module';
import { TodosModule } from 'src/todos/todos.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports:[
    AuthModule,
    SequelizeModule.forFeature([
      Todo,User, Project
    ]),
    FilesModule,
    TodosModule
  ]
})
export class ProjectsModule {}
