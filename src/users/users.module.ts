import { SequelizeModule } from '@nestjs/sequelize';
import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-role.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Todo } from 'src/todos/todo.model';
import { Project } from 'src/projects/project.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles,Todo,Project]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
