import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Maintenance } from 'src/entity/maintenance';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectRepository(Maintenance)
    private readonly mainRepo: Repository<Maintenance>,
    private readonly dataSource: DataSource,
  ) {}

  async createMaintenance(message: string): Promise<Maintenance> {
    return await this.dataSource.transaction(async (manager) => {
      // Step 1: Increment position of all existing maintenances
      await manager
        .createQueryBuilder()
        .update(Maintenance)
        .set({ position: () => `"position" + 1` }) // Ensure correct syntax based on your DB
        .execute();

      // Step 2: Create and save the new maintenance with position 1
      const newMaintenance = manager.create(Maintenance, {
        message,
        position: 1,
      });
      const savedMaintenance = await manager.save(newMaintenance);
      console.log(
        `Created new maintenance with ID: ${savedMaintenance.id} and Position: ${savedMaintenance.position}`,
      );
      return savedMaintenance;
    });
  }

  // Optional: Fetch all items ordered by position
  async getAllItems(): Promise<Maintenance[]> {
    return this.mainRepo.find({ order: { position: 'ASC' } });
  }
  async getTopMaintenance(): Promise<Maintenance> {
    const maintenance = await this.mainRepo.findOne({
      where: { position: 1 },
    });
    if (!maintenance) {
      throw new NotFoundException(
        'No maintenance record found with position 1',
      );
    }
    return maintenance;
  }
}
