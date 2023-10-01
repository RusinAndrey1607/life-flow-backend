import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { User } from 'src/users/users.model';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
  imports: [
    SequelizeModule.forFeature([Profile, User]),
    FilesModule,
    AuthModule,
  ],
})
export class ProfileModule {}
