import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
//import { InjectRepository } from '@nestjs/typeorm';
//import { Feedback } from 'src/entity/feedback.entity';
import { AuthUserGuard } from 'src/user/auth/authUser.guard';
//import { Repository } from 'typeorm';
import { FeedbackDTO } from './DTO/feedback.dto';
import { FeedbackService } from './feedback.service';
import { Feedback } from 'src/entity/feedback.entity';
import { AuthAdminGuard } from 'src/admin/auth/authAdmin.guard';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}
  @Post('addFeedback')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthUserGuard)
  async submitFeedback(
    @Body() feedbackDto: FeedbackDTO,
  ): Promise<{ message: string }> {
    await this.feedbackService.addFeedback(feedbackDto);
    return { message: 'Feedback submitted successfully.' };
  }

  @Get('getFeedbacks')
  async getAllFeedback(): Promise<Feedback[]> {
    return this.feedbackService.getFeedbacks();
  }
}
