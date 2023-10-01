import { CreateRoleDto } from './dto/create-role.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  async create(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }
  async getRoleByValue(value: string) {
    let role;
    role = await this.roleRepository.findOne({ where: { value } });
    if(!role){
      role = await this.roleRepository.create({value,description:`${value} role`});
    }
    return role;
  }
}
