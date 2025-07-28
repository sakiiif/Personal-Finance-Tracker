import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from 'src/entity/feedback.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepo: Repository<Feedback>,
  ) {}
  async addFeedback(feedbackData: Partial<Feedback>): Promise<Feedback> {
    const feedback = this.feedbackRepo.create(feedbackData);
    return this.feedbackRepo.save(feedback);
  }
  async getFeedbacks(): Promise<Feedback[]> {
    return this.feedbackRepo.find();
  }
}
