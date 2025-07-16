import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TherapistsModule } from './therapists/therapists.module';
import serverConfig from './config/server';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformerInterceptor } from './common/interceptors/transform.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [serverConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const db = configService.get<MysqlConnectionOptions>('database');
        return {
          ...db,
        };
      },
      inject: [ConfigService],
    }),
    TherapistsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformerInterceptor,
    },
  ],
})
export class AppModule {}
