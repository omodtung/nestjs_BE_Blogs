import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>
) { }
async create(userId: number, createPostDto: CreatePostDto): Promise<Post> {
  const user = await this.userRepository.findOneBy({ id: userId });

  try {
      const res = await this.postRepository.save({
          ...createPostDto, user
      })

      return await this.postRepository.findOneBy({ id: res.id });
  } catch (error) {
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
  }
}
  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
