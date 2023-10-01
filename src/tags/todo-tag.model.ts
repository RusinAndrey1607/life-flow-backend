
import { ApiProperty } from '@nestjs/swagger';
import { Model, Column, DataType, Table, ForeignKey } from 'sequelize-typescript';
import { Tag } from './tags.model';
import { Todo } from 'src/todos/todo.model';

@Table({
  tableName: 'tag_todos',
  createdAt:false,
  updatedAt:false
})
export class TagTodos extends Model<TagTodos> {
  @ApiProperty({example:1,description:"Unique id"})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(()=> Tag)
  @Column({
    type: DataType.INTEGER,
  })
  tagId:number

  @ForeignKey(()=> Todo)
  @Column({
    type: DataType.INTEGER,
  })
  todoId:number

}