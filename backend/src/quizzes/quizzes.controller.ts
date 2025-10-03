import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizDto } from './dto/quizzes.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  create(@Body() data: QuizDto) {
    return this.quizzesService.create(data);
  }

  @Get()
  findAll() {
    return this.quizzesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizzesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(id);
  }
}
