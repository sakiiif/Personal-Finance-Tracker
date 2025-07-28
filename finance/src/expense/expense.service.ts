import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/entity/expense.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { ExpenseDto, UpdateCategoryPriceResponseDto } from './DTO/expense.dto';
import { User } from 'src/entity/user.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<Expense>,
  ) {}
  async getCategoryValue(id: number, categoryKey: string): Promise<object> {
    // cast the JSONB subfield to float if we expect a numeric value.
    const rawResult = await this.expenseRepo
      .createQueryBuilder('expense')
      // (expense.data->>'someKey') gives JSON value as text
      // cast it to float to interpret it as a number
      .select(`(expense.data->>'${categoryKey}')::float`, 'value')
      .where('expense.id = :id', { id })
      .getRawOne();

    // rawResult will look like { value: "10.5" } or { value: null }
    const stringVal: string | null = rawResult?.value;

    // Convert to number if it’s not null
    const numericVal = stringVal ? parseFloat(stringVal) : null;

    return { [categoryKey]: numericVal };
  }
  async updateCategoryPrice(
    userId: number,
    dto: ExpenseDto,
  ): Promise<UpdateCategoryPriceResponseDto> {
    // Fetch the Expense record associated with the user
    const expense = await this.expenseRepo.findOne({
      where: { user: { id: userId } },
      // Exclude 'user' relation to prevent loading user data
      select: ['id', 'total_expense_goal', 'data'], // Explicitly select required fields
    });

    if (!expense) {
      throw new NotFoundException(
        `Expense record for userId=${userId} not found`,
      );
    }

    // Ensure that 'data' is initialized as an object
    if (typeof expense.data !== 'object' || expense.data === null) {
      expense.data = {};
    }

    // Iterate over each category in the DTO
    for (const [categoryKey, incomingPrice] of Object.entries(dto.data)) {
      if (typeof incomingPrice !== 'number' || incomingPrice < 0) {
        throw new BadRequestException(
          `Invalid price for category '${categoryKey}'. Must be a positive number.`,
        );
      }

      // Accumulate the price if the category exists, else initialize it
      if (expense.data.hasOwnProperty(categoryKey)) {
        expense.data[categoryKey] += incomingPrice;
      } else {
        expense.data[categoryKey] = incomingPrice;
      }
    }

    // Calculate total spending
    const totalSpending = Object.values(expense.data).reduce(
      (sum, value) => sum + value,
      0,
    );

    // Check if total spending exceeds the total expense goal
    let goalExceeded = false;
    let message: string | null = null;

    if (totalSpending > expense.total_expense_goal) {
      goalExceeded = true;
      message = 'Total spending has exceeded your expense goal.';
    }

    // Save the updated Expense record
    const savedExpense = await this.expenseRepo.save(expense);

    // Return the response DTO with message
    const response = new UpdateCategoryPriceResponseDto();
    response.id = savedExpense.id;
    response.total_expense_goal = savedExpense.total_expense_goal;
    response.data = savedExpense.data;
    response.goalExceeded = goalExceeded;
    response.message = message;

    return response;
  }
  async renameCategory(
    expenseId: number,
    oldKey: string,
    newKey: string,
  ): Promise<Expense> {
    const expense = await this.expenseRepo.findOneBy({ id: expenseId });
    if (!expense) {
      throw new NotFoundException(`Expense with id=${expenseId} not found`);
    }

    // Check if the oldKey exists
    if (!(oldKey in expense.data)) {
      throw new NotFoundException(
        `Category '${oldKey}' does not exist on expense ${expenseId}`,
      );
    }

    // Get the old price
    const oldPrice = expense.data[oldKey];

    // Remove the old key
    delete expense.data[oldKey];

    // Assign that price to the new key
    expense.data[newKey] = oldPrice;

    return this.expenseRepo.save(expense);
  }
  async getExpenseReportByUserId(userId: number): Promise<object> {
    const expense = await this.expenseRepo
      .createQueryBuilder('expense')
      .leftJoinAndSelect('expense.user', 'user')
      .where('user.id = :userId', { userId }) // Corrected parameter binding
      .getOne();

    if (!expense) {
      throw new NotFoundException(
        `No expense found for user with id=${userId}`,
      );
    }

    //data is a Record<string, number>, so just sum up the values
    const totalSpending = Object.values(expense.data).reduce(
      (sum, value) => sum + value,
      0,
    );

    return {
      expenseId: expense.id,
      user: expense.user.id,
      total_expense_goal: expense.total_expense_goal,
      data: expense.data,
      totalSpending,
    };
  }
  async createExpenseWithUserId(userId: number): Promise<Expense> {
    const expense = new Expense();
    // Assign the user relation by ID only
    expense.user = { id: userId } as User;
    expense.total_expense_goal = 0;
    expense.data = {};

    return this.expenseRepo.save(expense);
  }
  async getAllUserExpenseReports(): Promise<object[]> {
    // Fetch expenses with associated users, excluding those without users
    const expenses = await this.expenseRepo.find({
      relations: ['user'],
      where: { user: Not(IsNull()) },
    });

    if (expenses.length === 0) {
      console.log('No expenses found with associated users.');
    }

    return expenses
      .map((expense) => {
        if (!expense.user) {
          console.log(`Expense with ID ${expense.id} has no associated user.`);
          return null;
        }

        const totalSpending = Object.values(expense.data).reduce(
          (sum, val) => sum + val,
          0,
        );

        return {
          expenseId: expense.id,
          userId: expense.user.id,
          totalExpenseGoal: expense.total_expense_goal,
          data: expense.data,
          totalSpending,
        };
      })
      .filter((report) => report !== null); // Remove null entries
  }

  async updateorcreateExpense(
    userId: number,
    category: string,
    price: number,
    dto: ExpenseDto,
  ) {
    let expense = await this.expenseRepo.findOne({
      where: { user: { id: userId } },
    });

    if (!expense) {
      expense = this.expenseRepo.create({
        user: { id: userId },
        data: {},
        ...dto,
      });
    }

    // Update the data object with the new expense
    expense.data = {
      ...expense.data,
      [category]: price, // or (expense.data[category] || 0) + price if you want to accumulate
    };

    return this.expenseRepo.save(expense);
  }
  async updateExpenseGoal(userId: number, newGoal: number): Promise<Expense> {
    console.log(
      `Updating total_expense_goal for userId: ${userId} to ${newGoal}`,
    );

    // Validate input
    if (typeof newGoal !== 'number' || newGoal < 0) {
      throw new BadRequestException('Invalid total_expense_goal value.');
    }

    // Find the Expense record for the user
    let expense = await this.expenseRepo.findOne({
      where: { user: { id: userId } },
      //relations: ['user'],
    });

    if (!expense) {
      // If no expense record exists, create one
      expense = this.expenseRepo.create({
        user: { id: userId },
        data: {},
        total_expense_goal: newGoal,
      });
      console.log(
        `Created new expense with total_expense_goal for userId: ${userId}`,
      );
    } else {
      // Update the existing total_expense_goal
      expense.total_expense_goal = newGoal;
      console.log(
        `Updated total_expense_goal to ${newGoal} for userId: ${userId}`,
      );
    }

    return this.expenseRepo.save(expense);
  }

  // delete single category
  async deleteCategory(userId: number, categoryKey: string): Promise<Expense> {
    
    const expense = await this.expenseRepo.findOne({
      where: { user: { id: userId } },
      select: ['id', 'data'],
    });
  
    if (!expense) {
      throw new NotFoundException(`Expense record for userId=${userId} not found`);
    }
  
   
    if (!(categoryKey in expense.data)) {
      throw new NotFoundException(`Category '${categoryKey}' not found in user's expense data`);
    }
  
   
    delete expense.data[categoryKey];
  
    
    return this.expenseRepo.save(expense);
  }
  
}
