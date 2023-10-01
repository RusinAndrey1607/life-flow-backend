import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}
  //Create Role Endpoint

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiResponse({
    status: 200,
    description: 'Role creation',
    type: Role,
  })
  @Post('/')
  create(@Body() roleDto: CreateRoleDto) {
    const role = this.rolesService.create(roleDto);
    return role;
  }

  //Get Role Endpoint

  @Get('/:value')
  @ApiResponse({
    status: 200,
    description: 'Get role by value',
    type: Role,
  })
  getByValue(@Param('value') value: string) {
    const role = this.rolesService.getRoleByValue(value);
    return role;
  }
}
