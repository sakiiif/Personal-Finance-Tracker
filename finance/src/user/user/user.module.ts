import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { ExpenseModule } from 'src/expense/expense.module';
import { AdminModule } from 'src/admin/admin/admin.module';
//import { ExpenseService } from 'src/expense/expense.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ExpenseModule),
    forwardRef(() => AdminModule),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          secure: configService.get<boolean>('MAIL_SECURE'), // it should be 465 port with secure = true
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: `"No Reply" <${configService.get<string>('MAIL_FROM')}>`,
        },
        template: {
          dir: process.cwd() + '/templates', // Ensure this directory exists
          adapter: new HandlebarsAdapter(), // Using Handlebars for templating
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
  providers: [UserService],
})
export class UserModule {}
