import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { Maintenance } from 'src/entity/maintenance';
import { MaintenanceDTO, MaintenanceMessageDto } from './DTO/maintenance.dto';
import { AuthAdminGuard } from 'src/admin/auth/authAdmin.guard';
import { AuthUserGuard } from 'src/user/auth/authUser.guard';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}
  @Post('create')
  @UseGuards(AuthAdminGuard)
  async create(
    @Body() createMaintenanceDto: MaintenanceDTO,
  ): Promise<Maintenance> {
    return this.maintenanceService.createMaintenance(
      createMaintenanceDto.message,
    );
  }
  @Get('alert')
  @UseGuards(AuthUserGuard)
  async getTopMaintenance(): Promise<MaintenanceMessageDto> {
    const topMaintenance = await this.maintenanceService.getTopMaintenance();
    return { message: topMaintenance.message };
  }
}
