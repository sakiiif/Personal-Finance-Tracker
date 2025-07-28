import {
  Body,
  Controller,
  Post,
  //UseGuards,
  //HttpCode,
  //HttpStatus,
  //Post,
  //Res,
  //UseGuards,
} from '@nestjs/common';
import { GuestService } from './guest.service';
import { BudgetResponseDto, CreateBudgetDto } from './DTO/guest.dto';
//import { AuthGuestGuard } from './auth/authGuest.guard';
//import { Guest } from 'src/entity/guest.entity';

@Controller('guest')
// Apply globally to this controller
export class GuestController {
  constructor(private readonly guestService: GuestService) {}
  @Post('/budget')
  createBudget(@Body() createBudgetDto: CreateBudgetDto): BudgetResponseDto {
    return this.guestService.processBudget(createBudgetDto);
  }
}
//requires input in the body in the following format
/*
{
    "total_expense_goal": 1000.0,
  "categories": [
    { "name": "Groceries", "price": 150.0 },
    { "name": "Entertainment", "price": 200.0 },
    { "name": "Utilities", "price": 100.0 }
  ]
  
}*/
