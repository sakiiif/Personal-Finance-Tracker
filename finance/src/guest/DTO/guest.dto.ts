// src/guest/dto/create-category.dto.ts
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  Min,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;
}
export class CreateBudgetDto {
  @IsNumber()
  @Min(0)
  total_expense_goal: number;

  @ValidateNested({ each: true })
  @Type(() => CreateCategoryDto)
  @ArrayMinSize(1, { message: 'At least one category is required' })
  categories: CreateCategoryDto[];
}
export class BudgetResponseDto {
  @IsNumber()
  total_expense_goal: number;

  categories: CreateCategoryDto[];
  total_spending: number;
}
