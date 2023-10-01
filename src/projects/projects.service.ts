import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './project.model';
import { FilesService } from 'src/files/files.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Todo } from 'src/todos/todo.model';
import { CreateTodoDto } from 'src/todos/dto/create-todo.dto';
import { TodosService } from 'src/todos/todos.service';
import { AddTodoToProjectDto } from './dto/add-todo.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddTodosToProjectDto } from './dto/add-todos-to-project.dto';
import { Tag } from 'src/tags/tags.model';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project) private readonly projectRepository: typeof Project,
    private readonly fileService: FilesService,
    private readonly todoService: TodosService,
  ) {}
  async createProject(userId: number, dto: CreateProjectDto, header?: any) {
    let headerFileName = ' ';
    if (header) {
      headerFileName = await this.fileService.createFile(header);
    }
    const project = await this.projectRepository.create({
      ...dto,
      userId,
      header: headerFileName,
    });
    return project;
  }

  async getProjectById(userId: number) {
    const projects = await this.projectRepository.findAll({
      where: { userId },
      include: {
        model:Todo,
        include:[Tag]
      },
      order: [['id', 'DESC']],
    });
    return projects;
  }

  async addTodoToProject(userId: number, todoDto: AddTodoToProjectDto) {
    const todo = await this.todoService.createTodo(userId, { ...todoDto });
    const project = await this.projectRepository.findOne({
      where: {
        id: todoDto.projectId,
      },
      include: {
        model: Todo,
      },
    });
    if (!project) {
      throw new HttpException(
        `Project with id ${todoDto.projectId} Not Found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await project.$add('todos', [todo.id]);
    return project;
  }
  async deleteProject(userId: number, projectId: number) {
    const project = await this.projectRepository.destroy({
      where: {
        userId,
        id: projectId,
      },
    });
    if (!project) {
      throw new HttpException(
        `Project with id ${projectId} Not Found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return project;
  }
  async updateProject(userId: number, dto: UpdateProjectDto, header?: any) {
    const project = await this.projectRepository.findOne({
      where: {
        userId,
        id: dto.projectId,
      },
    });
    if (!project) {
      throw new HttpException(
        `Project with id ${dto.projectId} Not Found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    let headerFileName = '';

    if (header) {
      headerFileName = await this.fileService.createFile(header);
      await this.fileService.deleteFile(project.header);
    }
    await project.update({
      ...dto,
      header: header ? headerFileName : project.header,
    });
    return project;
  }

  async addTodosToProject(dto: AddTodosToProjectDto) {
    const project = await this.projectRepository.findByPk(dto.projectId, {
      include: {
        model: Todo,
      },
    });
    if (!project) {
      throw new HttpException(
        `Project with id ${dto.projectId} Not Found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await project.$add('todos', dto.todos);
    await project.save();
    return project;
  }
}
