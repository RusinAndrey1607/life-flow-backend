import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
  UploadedFiles,
  Req,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Profile } from './profile.model';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { QueryProfileDto } from './dto/query-profile.dto';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  //Create Profile Endpoint
  @ApiResponse({
    status: 200,
    description: 'Create Profile endpoint',
    type: Profile,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Profile Creation',
  })
  @ApiSecurity('JWT-AUTH')
  @Post('/create')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'avatar' }, { name: 'header' }]),
  )
  @UseGuards(JwtAuthGuard)
  create(
    @Body() dto: CreateProfileDto,
    @UploadedFiles() files,
    @Req() req: Request,
  ) {
    //@ts-ignore
    const userId = req.user.id;
    const avatarArr = files.avatar;
    const headerArr = files.header;

    const header = headerArr ? headerArr[0] : undefined;
    const avatar = avatarArr ? avatarArr[0] : undefined;
    const profile = this.profileService.createProfile(
      userId,
      dto,
      avatar,
      header,
    );
    return profile;
  }

  //Get Profile by userId Endpoint
  @ApiResponse({
    status: 200,
    description: 'Get Profile by userId endpoint',
    type: Profile,
  })
  @ApiOperation({
    summary: 'Get Profile ',
  })
  @ApiSecurity('JWT-AUTH')
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getByUserId(@Req() req: Request) {
    //@ts-ignore
    const userId = req.user.id;
    return this.profileService.getById(userId);
  }

  //Get Profile by query Endpoint
  @ApiResponse({
    status: 200,
    description: 'Get Profile by query endpoint',
    type: [Profile],
  })
  @ApiOperation({
    summary: 'Getting Profile',
  })
  @Get('/query')
  getByQuery(@Query() query:QueryProfileDto) {
    return this.profileService.getByQuery(query);
  }



  //Update Profile Endpoint
  @ApiResponse({
    status: 200,
    description: 'Update Profile endpoint',
    type: Profile,
  })
  @ApiOperation({
    summary: 'Profile Update',
  })
  @ApiSecurity('JWT-AUTH')
  @Put('/update')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'avatar' }, { name: 'header' }]),
  )
  @UseGuards(JwtAuthGuard)
  update(
    @Body() dto: UpdateProfileDto,
    @UploadedFiles() files,
    @Req() req: Request,
  ) {
    //@ts-ignore
    const userId = req.user.id;
    const avatarArr = files.avatar;
    const headerArr = files.header;

    const header = headerArr ? headerArr[0] : undefined;
    const avatar = avatarArr ? avatarArr[0] : undefined;
    const profile = this.profileService.updateProfile(
      userId,
      dto,
      avatar,
      header,
    );
    return profile;
  }

  //Delete Profile Endpoint
  @ApiResponse({
    status: 200,
    description: 'Delete Profile endpoint',
    type: Profile,
  })
  @ApiOperation({
    summary: 'Profile Delete',
  })
  @ApiSecurity('JWT-AUTH')
  @UseGuards(JwtAuthGuard)
  @Delete('/')
  delete(@Req() req: Request) {
    //@ts-ignore
    const userId = req.user.id;
    return this.profileService.deleteProfile(userId);
  }

  
}
