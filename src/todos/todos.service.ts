import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Tag } from 'src/tags/tags.model';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo) private readonly todoRepository: typeof Todo,
  ) {}

  async createTodo(userId: number, dto: CreateTodoDto) {
    const todo = await this.todoRepository.create({
      ...dto,
      userId,
    });
    if (dto.tags) {
      todo.$set('tags', dto.tags);
    }
    return todo;
  }
  async getTodos(userId: number) {
    const todos = await this.todoRepository.findAll({
      where: {
        userId,
      },
      include: {
        model:Tag,
      },
      order: [
        ['id', 'DESC'],
      ]
    });
    return todos;
  }

  async deleteTodo(userId: number, todoId: number) {
    const todo = await this.todoRepository.destroy({
      where: {
        userId,
        id: todoId,
      },
      
    });
    return todo;
  }
  async updateTodo(userId: number,dto: UpdateTodoDto) {
    const { tags, ...rest } = dto;
    const todo = await this.todoRepository.findOne({
      where: {
        userId,
        id: rest.todoId,
      },
      include:{
        all:true
      }
    });
    todo.update({ ...rest });
    if(tags){
        todo.$set('tags', tags);
    }
    await todo.save();
    return todo;
  }

}
