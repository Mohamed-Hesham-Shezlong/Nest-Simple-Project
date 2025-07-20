import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  Patch,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { TherapistsService } from './therapists.service';
import { CreateTherapistDto } from './dto/create-therapist.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/entities/user.entity';
import { Therapist } from './entities/therapist.entity';
import { UserRole } from 'src/auth/interfaces/user.role';
import { IsAdminGuard } from 'src/auth/guards/admin-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { csvUploadConfig } from 'src/config/csv-upload';
import { CsvService } from 'src/csv/csv.service';

@Controller('therapists')
@UseGuards(JwtAuthGuard)
export class TherapistsController {
  constructor(
    private readonly therapistsService: TherapistsService,
    private readonly csvService: CsvService,
  ) {}

  @Post()
  @UseGuards(IsAdminGuard)
  async create(
    @Body() createTherapistDto: CreateTherapistDto,
    @CurrentUser() user: User,
  ) {
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
  @UseGuards(IsAdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTherapistDto: Partial<CreateTherapistDto>,
    @CurrentUser() user: User,
  ) {
    return this.therapistsService.update(+id, updateTherapistDto);
  }

  @Delete(':id')
  @UseGuards(IsAdminGuard)
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.therapistsService.remove(+id);
  }

  @Post('upload-csv')
  @UseInterceptors(FileInterceptor('file', csvUploadConfig))
  async uploadCSVFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    if (!file) {
      return new BadRequestException('File not provided');
    }
    console.log('File uploaded:', file);
    return await this.csvService.parseCsv(file.path);
  }
}
