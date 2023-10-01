import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { TagTodos } from './todo-tag.model';
import { Todo } from 'src/todos/todo.model';

interface TagCreationAttrs {
  name: string;
  color: string;
  userId:number
}
@Table({
  tableName: 'tags',
  createdAt:false,
  updatedAt:false
})
export class Tag extends Model<Tag, TagCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Sport', description: 'Description of a tag !' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: '#7D55C7', description: 'Purple' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  color: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: false,
  })
  userId: number;
  
  @BelongsToMany(() => Todo,() => TagTodos)
  todos:Todo[]
}
