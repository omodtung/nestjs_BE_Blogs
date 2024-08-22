import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Req,
  UploadedFile,
  BadRequestException,
  UseInterceptors,
  ParseArrayPipe,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FilterUserDto } from './dto/filter-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  
  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['Admin'])
  @Get()
  findAll(@Query() query: FilterUserDto): Promise<User[]> {
    console.log(query);
    return this.userService.findAll(query);
  }
  @Get('profile')
  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['Admin'])
  profile(@Req() req: any): Promise<User> {
    // console.log('req => ', req.user_data.id);
    return this.userService.findOne(Number(req.user_data.id));
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(Number(id), updateUserDto);
  }

  // @SetMetadata('roles', ['Admin'])
  @UseGuards(AuthGuard)
  
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(Number(id));
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(Number(id));
  }

  @Delete('multiple')
  multipleDelete(
    @Query('ids', new ParseArrayPipe({ items: String, separator: ',' }))
    ids: string[],
  ) {
    console.log('delete multi=> ', ids);
    return this.userService.multipleDelete(ids);
  }

  @Post('upload-avatar')
  @UseGuards(AuthGuard)
  // viet validation cho file
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: storageConfig('avatar'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.png', '.jpeg'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `wrong extension type accepts file ext are:${allowedExtArr.toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            req.fileValidationError =
              'File size is too large. Accepted file size is less than 5 MB';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  uploadAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    console.log('upload avatar');
    console.log('user data', req.user_data);
    console.log(file);
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.userService.updateAvatar(
      req.user_data.id,
      file.fieldname + '/' + file.filename,
    );
  }
}
// http://localhost:5000/user/multiple?ids=11,13
