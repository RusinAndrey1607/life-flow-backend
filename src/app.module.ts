import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-role.model';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { FilesModule } from './files/files.module';
import { Profile } from './profile/profile.model';
import { TagsModule } from './tags/tags.module';
import { Tag } from './tags/tags.model';
import { TodosController } from './todos/todos.controller';
import { TodosModule } from './todos/todos.module';
import { TagTodos } from './tags/todo-tag.model';
import { Todo } from './todos/todo.model';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/project.model';

@Module({
    imports:[
        ConfigModule.forRoot({
            envFilePath:`.env`
        }),
        SequelizeModule.forRoot({
            database: process.env.POSTGRES_DATABASE,
            dialect: 'postgres',
            uri: process.env.POSTGRES_URL,
            // port: +process.env.POSTGRES_PORT,
            // username: process.env.POSTGRES_USER,
            // password: process.env.POSTGRES_PASSWORD,
            // host: process.env.POSTGRES_HOST,
            autoLoadModels: true,
            models: [User,Role,UserRoles,Profile,Tag,TagTodos,Todo,Project],
           
        }),
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, 'static'),
      
          }),
        UsersModule,
        RolesModule,
        AuthModule,
        ProfileModule,
        FilesModule,
        TagsModule,
        TodosModule,
        ProjectsModule,
    ],
})
export class AppModule {}
