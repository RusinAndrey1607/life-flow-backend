import { ApiProperty } from '@nestjs/swagger';
import { UUIDV4 } from 'sequelize';
import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Todo } from 'src/todos/todo.model';
import { User } from 'src/users/users.model';

interface ProjectCreationAttrs {
  name: string;
  username: string;
  avatar?: string;
  header?: string;
  bio?: string;
  userId: number;
}

@Table({
  tableName: 'projects',
})
export class Project extends Model<Project, ProjectCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @ApiProperty({
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d.jpg',
    description: 'Header Filename',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  })
  header: string;

  @ApiProperty({ example: 'project information', description: 'Project description' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  })
  description: string;

  @ApiProperty({ example: 'Project #1', description: 'Project name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', description: 'Unique ProjectId' })
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue:UUIDV4()
  })
  uuid: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: false,
  })
  userId: number;

  @BelongsTo(() => User)
  author:User

  @HasMany(() => Todo)
  todos:[Todo]
}