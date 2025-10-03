import {
  IsString,
  IsIn,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export type QuestionType = 'boolean' | 'input' | 'checkbox';

export class QuestionDto {
  @IsString()
  @IsIn(['boolean', 'input', 'checkbox'])
  type: QuestionType;

  @IsString()
  text: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  options?: string[];
}
