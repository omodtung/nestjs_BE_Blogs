import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import {JwtModule} from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  
  imports:[
  TypeOrmModule.forFeature([User]),
  JwtModule.register({
    global:true,
    secret:'123456',
    // secret : ConfigService.get<string>('SECRET');
    signOptions:{expiresIn:100}
  }),
  ConfigModule
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
