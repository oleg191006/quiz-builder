import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizDto } from './dto/quizzes.dto';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  create(data: QuizDto) {
    return this.prisma.quiz.create({
      data: {
        title: data.title,
        questions: {
          create: data.questions.map((q) => ({
            type: q.type,
            text: q.text,
            options: q.options ? JSON.stringify(q.options) : null,
          })),
        },
      },
      include: { questions: true },
    });
  }

  findAll() {
    return this.prisma.quiz.findMany({ include: { questions: true } });
  }

  findOne(id: string) {
    return this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });
  }

  remove(id: string) {
    return this.prisma.quiz.delete({ where: { id } });
  }
}
