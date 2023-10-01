import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsToMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Project } from 'src/projects/project.model';
import { Tag } from 'src/tags/tags.model';
import { TagTodos } from 'src/tags/todo-tag.model';
import { User } from 'src/users/users.model';

interface TodoCreationAttrs {
  name: string;
  userId: number;
  description?: string;
  priority:0|1|2|3
}

type TimeStamps = {
  start:Date,
  end:Date
}
@Table({
  tableName: 'todos',
})
export class Todo extends Model<Todo, TodoCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Do something !', description: 'Todo name' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'Todo descriptiopn',
    description: 'Description must be a richText string',
  })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  description: string;

  @ApiProperty({ example: true, description: 'Todo status' })
  @Column({
    type: DataType.BOOLEAN,
    unique: false,
    allowNull: false,
    defaultValue: false,
  })
  status: boolean;

  @ApiProperty({ example: 'Todo priority', description: 'Todo priority it is enum 0, 1,2 or 3' })
  @Column({
    type: DataType.ENUM("0","1","2","3"),
    unique: false,
    allowNull: false,
    defaultValue:"0"
  })
  priority:number;
  
  @ApiProperty({ description: 'Todo timestamps', example: '[{start:1693984934752, end:1693984938752}]' })
  @Column({
    type: DataType.ARRAY(DataType.JSON),
    unique: false,
    allowNull: false,
    defaultValue:[]
  })
  timeStamps:Array<TimeStamps>;


  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: false,
  })
  userId: number;

  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    unique: false,
  })
  projectId: number;
    
  @BelongsTo(() => Project)
  project:Project
  
  @BelongsToMany(() => Tag, () => TagTodos)
  tags: Tag[];

}
