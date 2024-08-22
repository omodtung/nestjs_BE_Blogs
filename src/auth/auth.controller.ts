import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @SetMetadata('isPublic',true)
  register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    console.log('register api');
    console.log(registerUserDto);
    return this.authService.register(registerUserDto);
  }
  @Post('login')
  @SetMetadata('isPublic',true)
  login(@Body() loginUserDTO: LoginUserDto): Promise<any> {
    console.log('login api');
    console.log('refresh_token api');
    return this.authService.login(loginUserDTO);
  }
  @Post('refresh-token')
  @SetMetadata('isPublic',true)
  refreshToken(@Body() { refresh_token }): Promise<any> {
    console.log('refresh token api');
    return this.authService.refreshToken(refresh_token);
  }
}
