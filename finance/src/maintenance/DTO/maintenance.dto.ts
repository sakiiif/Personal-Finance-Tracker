import { IsString } from 'class-validator';

export class MaintenanceDTO {
  @IsString({ message: 'message must be a string' }) message: string;
  position: number;
}
export class MaintenanceMessageDto {
  @IsString({ message: 'message must be a string' })
  message: string;
}
