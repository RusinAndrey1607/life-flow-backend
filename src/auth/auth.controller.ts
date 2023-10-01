import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiConsumes,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

class Token {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'JWT token',
  })
  token: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Login Endpoint

  @ApiConsumes('application/json')
  @ApiResponse({
    status: 200,
    description: 'User login endpoint',
    type: Token,
  })
  @ApiOperation({
    summary: 'User Login',
  })
  @Post('/login')
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  //Registration Endpoint
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 200,
    description: 'User registration endpoint',
    type: Token,
  })
  @ApiOperation({
    summary: 'User registration',
  })
  @Post('/registration')
  registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }
}
