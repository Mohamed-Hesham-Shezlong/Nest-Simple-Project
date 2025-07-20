import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TherapistsController } from './therapists.controller';
import { TherapistsService } from './therapists.service';
import { Therapist } from './entities/therapist.entity';
import { CsvService } from 'src/csv/csv.service';

@Module({
  imports: [TypeOrmModule.forFeature([Therapist])],
  controllers: [TherapistsController],
  providers: [TherapistsService, CsvService],
})
export class TherapistsModule {}
