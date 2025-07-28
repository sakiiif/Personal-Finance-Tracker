import { IsInt, IsPositive } from 'class-validator';
import { Expose } from 'class-transformer';
export class ExpenseDto {
  userid: number;
  total_expense_goal: number;
  data: Record<string, number>;
}
export class UpdateExpenseGoalDto {
  @IsInt({ message: 'Total expense goal must be an integer.' })
  @IsPositive({ message: 'Total expense goal must be a positive number.' })
  total_expense_goal: number;
}

export class UpdateCategoryPriceResponseDto {
  @Expose()
  id: number;

  @Expose()
  total_expense_goal: number;

  @Expose()
  data: Record<string, number>;

  @Expose()
  goalExceeded: boolean;

  @Expose()
  message?: string;
}
