import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  
  constructor(@InjectRepository(Category) private categoryRepository:Repository<Category>){}

  async findAll():Promise<Category[]> {
      return await this.categoryRepository.find();
  }
}
