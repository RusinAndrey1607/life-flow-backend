import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { User } from './users.model';
import { BanUserDto } from './dto/ban-user.dto';
import { UnBanUserDto } from './dto/unban-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  //Create User Endpoint

  @ApiOperation({
    summary: 'User Creation',
  })
  @UsePipes(ValidationPipe)
  @Post('/')
  create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  //GetAll Users Endpoint

  @ApiOperation({
    summary: 'Get All users',
  })
  @Get('/')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiResponse({ status: 200, type: [User] })
  getAll() {
    return this.userService.getAllUsers();
  }

  //Add role to User Endpoint

  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  //Ban User Endpoint

  @ApiOperation({
    summary: 'Ban user',
  })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  banUser(@Body() dto: BanUserDto) {
    return this.userService.banUser(dto);
  }

  //Unban User Endpoint

  @ApiOperation({
    summary: 'UnBan user',
  })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/unban')
  unBanUser(@Body() dto: UnBanUserDto) {
    return this.userService.unBanUser(dto);
  }
}
