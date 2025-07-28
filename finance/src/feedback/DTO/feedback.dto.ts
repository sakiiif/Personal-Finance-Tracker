import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class FeedbackDTO {
  //id: number;
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  feedback: string;
  //datePosted: Date;
}
