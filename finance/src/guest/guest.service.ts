import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guest } from 'src/entity/guest.entity';
import { Repository } from 'typeorm';
import { BudgetResponseDto, CreateBudgetDto } from './DTO/guest.dto';

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest)
    private guestRepository: Repository<Guest>,
  ) {}

  // Create a new guest
  async createGuest(): Promise<Guest> {
    try {
      const guest = this.guestRepository.create(); // Triggers BeforeInsert
      return await this.guestRepository.save(guest);
    } catch (error) {
      if (error.code === '23505') {
        // Unique violation in PostgreSQL
        throw new ConflictException(
          'Username already exists. Please try again.',
        );
      }
      throw error;
    }
  }
  processBudget(createBudgetDto: CreateBudgetDto): BudgetResponseDto {
    const total_spending = createBudgetDto.categories.reduce(
      (sum, category) => sum + category.price,
      0,
    );

    return {
      total_expense_goal: createBudgetDto.total_expense_goal,
      categories: createBudgetDto.categories,
      total_spending,
    };
  }
}
