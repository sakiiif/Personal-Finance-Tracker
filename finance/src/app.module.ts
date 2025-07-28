import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './data-source';
import { AuthAdminModule } from 'src/admin/auth/auth.module';
import { AdminModule } from 'src/admin/admin/admin.module';
import { AuthModule } from './user/auth/auth.module';
import { UserModule } from './user/user/user.module';
import { ExpenseModule } from './expense/expense.module';
import { FeedbackModule } from './feedback/feedback.module';
import { GuestModule } from './guest/guest.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import the ConfigModule
      inject: [ConfigService], // Inject the configuration options
      useFactory: async () => {
        await config.initialize(); // Initialize the DataSource
        return config.options; // Return the configuration options
      },
    }),
    AuthAdminModule,
    AdminModule,
    AuthModule,
    UserModule,
    ExpenseModule,
    FeedbackModule,
    GuestModule,
    MaintenanceModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
