import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  //Todo creation
  @ApiResponse({
    status: 200,
    description: 'Create todo endpoint',
    type: Todo,
  })
  @ApiOperation({
    summary: 'Todo Creation',
  })
  @ApiSecurity('JWT-AUTH')
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() dto: CreateTodoDto, @Req() req: Request) {
    // @ts-ignore
    const userId = req.user.id
    return this.todosService.createTodo(userId,dto)
  }

  //Get todos
  @ApiResponse({
    status: 200,
    description: 'Get Tags endpoint',
    type: [Todo],
  })
  @ApiOperation({
    summary: 'Get Tags',
  })
  @ApiSecurity('JWT-AUTH')
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getTagsByUserId(@Req() req: Request) {
    //@ts-ignore
    const userId = req.user.id;
    return this.todosService.getTodos(userId);
  }

  //Update Todo
  @ApiResponse({
    status: 200,
    description: 'Update todo endpoint',
    type: Todo,
  })
  @ApiOperation({
    summary: 'Todo Update',
  })
  @ApiSecurity('JWT-AUTH')
  @UseGuards(JwtAuthGuard)
  @Put('/update')
  update(@Body() dto: UpdateTodoDto, @Req() req: Request) {
    // @ts-ignore
    const userId = req.user.id
    return this.todosService.updateTodo(userId,dto)
  }

  //Delete todo
  @ApiResponse({
    status: 200,
    description: 'Delete todo endpoint',
  })
  @ApiOperation({
    summary: 'Todo delete',
  })
  @ApiSecurity('JWT-AUTH')
  @UseGuards(JwtAuthGuard)
  @Delete("/:todoId")
  delete(@Param("todoId") todoId:number, @Req() req:Request){
    //@ts-ignore
    const userId = req.user.id 
    return this.todosService.deleteTodo(userId, todoId)
  }
}
