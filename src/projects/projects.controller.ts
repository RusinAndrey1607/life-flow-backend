import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.model';
import { AddTodoToProjectDto } from './dto/add-todo.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddTodosToProjectDto } from './dto/add-todos-to-project.dto';

@ApiTags("Projects")
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectSevrice: ProjectsService) {}

  //Create Project Endpoint
  @ApiResponse({
    status: 200,
    description: 'Create Project endpoint',
    type: Project,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Project Creation',
  })
  @ApiSecurity('JWT-AUTH')
  @Post('/create')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'header' }]))
  @UseGuards(JwtAuthGuard)
  create(
    @Body() dto: CreateProjectDto,
    @UploadedFiles() files,
    @Req() req: Request,
  ) {
    //@ts-ignore
    const userId = req.user.id;
    const headerArr = files.header;

    const header = headerArr ? headerArr[0] : undefined;
    const project = this.projectSevrice.createProject(userId, dto, header);
    return project;
  }

   //Get Projects by userId Endpoint
   @ApiResponse({
    status: 200,
    description: 'Get Projects by userId endpoint',
    type: [Project],
  })
  @ApiOperation({
    summary: 'Profile Update',
  })
  @ApiSecurity('JWT-AUTH')
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getByUserId(@Req() req: Request) {
    //@ts-ignore
    const userId = req.user.id;
    return this.projectSevrice.getProjectById(userId);
  }

  //Add todo to project Endpoint
  @ApiResponse({
    status: 200,
    description: 'Add todo to project endpoint',
    type: Project,
  })
  @ApiOperation({
    summary: 'Add todo to project',
  })
  @ApiSecurity('JWT-AUTH')
  @Post('/addTodo')
  @UseGuards(JwtAuthGuard)
  addTodoToProject(
    @Body() dto: AddTodoToProjectDto,
    @Req() req: Request,
  ) {
    //@ts-ignore
    const userId = req.user.id;
    const project = this.projectSevrice.addTodoToProject(userId,dto)
    return project
  }
  
   //Delete Profile Endpoint
   @ApiResponse({
    status: 200,
    description: 'Delete Project endpoint',
  })
  @ApiOperation({
    summary: 'Project Delete',
  })
  @ApiSecurity('JWT-AUTH')
  @UseGuards(JwtAuthGuard)
  @Delete('/:projectId')
  delete(@Req() req: Request,@Param("projectId") projectId:number) {
    //@ts-ignore
    const userId = req.user.id;
    return this.projectSevrice.deleteProject(userId,projectId)
  }

   //Update Profile Endpoint
   @ApiResponse({
    status: 200,
    description: 'Update Project endpoint',
    type: Project,
  })
  @ApiOperation({
    summary: 'Project Update',
  })
  @ApiConsumes('multipart/form-data')
  @ApiSecurity('JWT-AUTH')
  @Put('/update')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'header' }]),
  )
  @UseGuards(JwtAuthGuard)
  update(
    @Body() dto: UpdateProjectDto,
    @UploadedFiles() files,
    @Req() req: Request,
  ) {
    //@ts-ignore
    const userId = req.user.id;
    const headerArr = files.header;

    const header = headerArr ? headerArr[0] : undefined;
    const project = this.projectSevrice.updateProject(
      userId,
      dto,
      header,
    );
    return project;
  }

  //Add todos to project Endpoint
  @ApiResponse({
    status: 200,
    description: 'Add todos to project endpoint',
    type: Project,
  })
  @ApiOperation({
    summary: 'Add todos to project',
  })
  @ApiSecurity('JWT-AUTH')
  @Post('/addTodos')
  @UseGuards(JwtAuthGuard)
  addTodosToProject(
    @Body() dto:AddTodosToProjectDto,
  ) {
    const project = this.projectSevrice.addTodosToProject(dto)
    return project
  }
}
