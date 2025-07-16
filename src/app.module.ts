import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TherapistsModule } from './therapists/therapists.module';
import serverConfig from './config/server';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [serverConfig],
    }),
    TherapistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
