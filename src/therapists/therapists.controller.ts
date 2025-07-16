import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { TherapistsService } from './therapists.service';
import { CreateTherapistDto } from './dto/create-therapist.dto';
import { Therapist } from './interfaces/therapist.interface';

@Controller('therapists')
export class TherapistsController {
  constructor(private readonly therapistsService: TherapistsService) {}

  @Post()
  create(@Body() createTherapistDto: CreateTherapistDto): Therapist {
    return this.therapistsService.create(createTherapistDto);
  }

  @Get()
  findAll(): Therapist[] {
    return this.therapistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Therapist {
    const therapist = this.therapistsService.findOne(Number(id));
    if (!therapist) {
      throw new HttpException('Therapist not found', HttpStatus.NOT_FOUND);
    }
    return therapist;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateTherapistDto>,
  ): Therapist {
    const therapist = this.therapistsService.update(Number(id), updateData);
    if (!therapist) {
      throw new HttpException('Therapist not found', HttpStatus.NOT_FOUND);
    }
    return therapist;
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    const isDeleted = this.therapistsService.remove(Number(id));
    if (!isDeleted) {
      throw new HttpException('Therapist not found', HttpStatus.NOT_FOUND);
    }
  }
}
