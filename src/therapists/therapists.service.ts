import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Therapist } from './entities/therapist.entity';
import { CreateTherapistDto } from './dto/create-therapist.dto';

@Injectable()
export class TherapistsService {
  constructor(
    @InjectRepository(Therapist)
    private therapistsRepository: Repository<Therapist>,
  ) {}

  async create(createTherapistDto: CreateTherapistDto): Promise<Therapist> {
    const existingTherapist = await this.therapistsRepository.findOne({
      where: { email: createTherapistDto.email },
    });
    if (existingTherapist) {
      throw new BadRequestException('Therapist with this email already exists');
    }

    const therapist = this.therapistsRepository.create({
      ...createTherapistDto,
      isAvailable: true,
    });
    return this.therapistsRepository.save(therapist);
  }

  async findAll(): Promise<Therapist[]> {
    return this.therapistsRepository.find();
  }

  async findOne(id: number): Promise<Therapist> {
    const therapist = await this.therapistsRepository.findOne({
      where: { id },
    });
    if (!therapist) {
      throw new NotFoundException(`Therapist with ID ${id} not found`);
    }
    return therapist;
  }

  async update(
    id: number,
    updateData: Partial<CreateTherapistDto>,
  ): Promise<Therapist> {
    const therapist = await this.findOne(id);
    Object.assign(therapist, updateData);

    if (updateData.email) {
      const existingTherapist = await this.therapistsRepository.findOne({
        where: { email: updateData.email },
      });
      if (existingTherapist) {
        throw new BadRequestException(
          'Therapist with this email already exists',
        );
      }
    }

    return this.therapistsRepository.save(therapist);
  }

  async remove(id: number): Promise<DeleteResult> {
    const result = await this.therapistsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Therapist with ID ${id} not found`);
    }
    return result;
  }
}
