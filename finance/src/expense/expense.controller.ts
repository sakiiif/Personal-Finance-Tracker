import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  UseGuards,
  //Post,
  //ParseIntPipe,
  ParseFloatPipe,
  NotFoundException,
  Put,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseDto, UpdateExpenseGoalDto } from './DTO/expense.dto';
import { AuthUserGuard } from 'src/user/auth/authUser.guard';
import { AuthAdminGuard } from 'src/admin/auth/authAdmin.guard';
import { UserService } from 'src/user/user/user.service';
import { Request } from 'express';
@Controller('expense')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly userService: UserService,
  ) {}
  @UseGuards(AuthUserGuard)
  @Get('category/:categoryKey') //user can view/create their own category value report
  async getCategoryValue(
    @Req() request: Request,
    @Param('categoryKey') categoryKey: string,
  ) {
    const authenticatedUser = request['user'];
    if (authenticatedUser.role === 'admin') {
      throw new UnauthorizedException(
        'Admin not allowed to view specific user expense report',
      );
    }
    if (!authenticatedUser) {
      throw new UnauthorizedException('User not authenticated');
    }

    const userId = authenticatedUser.sub;
    const user = await this.userService.findbyid(userId);
    if (!user) {
      throw new NotFoundException(`User with id=${userId} not found`);
    }
    return this.expenseService.getCategoryValue(user.id, categoryKey);
  }
  @UseGuards(AuthUserGuard)
  @Patch('category/price') //user can update their own category price
  async updateCategoryPrice(@Req() request: Request, @Body() dto: ExpenseDto) {
    const authenticatedUser = request['user'];
    if (authenticatedUser.role === 'admin') {
      throw new UnauthorizedException(
        'Admin not allowed to view specific user expense report',
      );
    }
    if (!authenticatedUser) {
      throw new UnauthorizedException('User not authenticated');
    }

    const userId = authenticatedUser.sub;
    const user = await this.userService.findbyid(userId);
    if (!user) {
      throw new NotFoundException(`User with id=${userId} not found`);
    }
    return this.expenseService.updateCategoryPrice(user.id, dto);
  }
  /*{
    "data": {
      "Food": 1000
    }
  }*/ //above is the body for the request category/price
  @UseGuards(AuthUserGuard)
  @Patch('category/rename/:oldKey/:newKey') //user can rename their own category
  async renameCategory(
    @Req() request: Request,
    @Param('oldKey') oldKey: string,
    @Param('newKey') newKey: string,
  ) {
    const authenticatedUser = request['user'];
    if (authenticatedUser.role === 'admin') {
      throw new UnauthorizedException(
        'Admin not allowed to view specific user expense report',
      );
    }
    if (!authenticatedUser) {
      throw new UnauthorizedException('User not authenticated');
    }

    const userId = authenticatedUser.sub;
    const user = await this.userService.findbyid(userId);
    if (!user) {
      throw new NotFoundException(`User with id=${userId} not found`);
    }
    return this.expenseService.renameCategory(user.id, oldKey, newKey);
  }
  @UseGuards(AuthUserGuard)
  @Get('user/expensereport') //user can view/create their own expense report
  async getExpenseReport(@Req() request: Request) {
    const authenticatedUser = request['user']; // Adjust based on your guard's implementation
    if (authenticatedUser.role === 'admin') {
      throw new UnauthorizedException(
        'Admin not allowed to view specific user expense report',
      );
    }
    if (!authenticatedUser) {
      throw new UnauthorizedException('User not authenticated');
    }

    const userId = authenticatedUser.sub;
    const user = await this.userService.findbyid(userId);
    if (!user) {
      throw new NotFoundException(`User with id=${userId} not found`);
    }
    console.log(user);
    return this.expenseService.getExpenseReportByUserId(user.id);
  }

  @UseGuards(AuthAdminGuard)
  @Get('admin/getallexpense') //admin can view all user expenses for generating reports
  async getAllUserExpenses() {
    return this.expenseService.getAllUserExpenseReports();
  }
  @UseGuards(AuthUserGuard)
  @Put('user/:category/:price') // adds category and price to the user's expense (initial)
  async updateExpense(
    @Req() request: Request,
    @Param('category') category: string,
    @Param('price', ParseFloatPipe) price: number,
    @Body() dto: ExpenseDto,
  ) {
    const authenticatedUser = request['user'];
    if (!authenticatedUser) {
      throw new UnauthorizedException('User not authenticated');
    }
    const userId = authenticatedUser.sub;
    const user = await this.userService.findbyid(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.expenseService.updateorcreateExpense(
      user.id,
      category,
      price,
      dto,
    );
  }
  @Put('goal')
  @UseGuards(AuthUserGuard)
  async updateExpenseGoal(
    @Req() request: Request,
    @Body() updateExpenseGoalDto: UpdateExpenseGoalDto,
  ) {
    const authenticatedUser = request['user'];
    if (!authenticatedUser) {
      throw new UnauthorizedException('User not authenticated');
    }

    const userId = authenticatedUser.sub; // Correctly extract user ID from 'sub' claim
    console.log(`Authenticated user ID for goal update: ${userId}`); // Debugging log

    const user = await this.userService.findbyid(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.expenseService.updateExpenseGoal(
      user.id,
      updateExpenseGoalDto.total_expense_goal,
    );
  }

  @UseGuards(AuthUserGuard)
@Patch('category/delete/:categoryKey')
async deleteCategory(@Req() request: Request, @Param('categoryKey') categoryKey: string) {
  const authenticatedUser = request['user'];
  console.log(authenticatedUser);
  if (!authenticatedUser) {
    throw new UnauthorizedException('User not authenticated');
  }

  if (authenticatedUser.role === 'admin') {
    throw new UnauthorizedException('Admin not allowed to delete user expenses');
  }

  const userId = authenticatedUser.sub;
  console.log(userId);
  return this.expenseService.deleteCategory(userId, categoryKey);
}



// @UseGuards(AuthUserGuard)
// @Patch('category/:categoryKey/subcategory')
// async addSubcategory(
//   @Req() request: Request,
//   @Param('categoryKey') categoryKey: string,
//   @Body() body: { subcategory: string; amount: number }
// ) {
//   const authenticatedUser = request['user'];

//   if (authenticatedUser.role === 'admin') {
//     throw new UnauthorizedException('Admin not allowed to modify user expenses');
//   }

//   if (!authenticatedUser) {
//     throw new UnauthorizedException('User not authenticated');
//   }

//   const userId = authenticatedUser.sub;
//   return this.expenseService.addSubcategory(userId, categoryKey, body.subcategory, body.amount);
// }


}
