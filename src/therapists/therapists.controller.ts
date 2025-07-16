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
  async create(
    @Body() createTherapistDto: CreateTherapistDto,
  ): Promise<Therapist> {
    return await this.therapistsService.create(createTherapistDto);
  }

  @Get()
  async findAll(): Promise<Therapist[]> {
    return await this.therapistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Therapist> {
    const therapist = await this.therapistsService.findOne(Number(id));
    if (!therapist) {
      throw new HttpException('Therapist not found', HttpStatus.NOT_FOUND);
    }
    return therapist;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateTherapistDto>,
  ): Promise<Therapist> {
    const therapist = await this.therapistsService.update(
      Number(id),
      updateData,
    );
    if (!therapist) {
      throw new HttpException('Therapist not found', HttpStatus.NOT_FOUND);
    }
    return therapist;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const isDeleted = await this.therapistsService.remove(Number(id));
    if (!isDeleted) {
      throw new HttpException('Therapist not found', HttpStatus.NOT_FOUND);
    }
  }
}
