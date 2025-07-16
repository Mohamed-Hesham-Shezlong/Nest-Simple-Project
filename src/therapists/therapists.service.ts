import { Injectable } from '@nestjs/common';
import { Therapist } from './interfaces/therapist.interface';
import { CreateTherapistDto } from './dto/create-therapist.dto';

@Injectable()
export class TherapistsService {
  private readonly therapists: Therapist[] = [];

  create(createTherapistDto: CreateTherapistDto): Therapist {
    const therapist: Therapist = {
      id: this.therapists.length + 1,
      ...createTherapistDto,
      isAvailable: true,
      rating: 0,
    };
    this.therapists.push(therapist);
    return therapist;
  }

  findAll(): Therapist[] {
    return this.therapists;
  }

  findOne(id: number): Therapist | null {
    return this.therapists.find((therapist) => therapist.id === id) ?? null;
  }

  update(
    id: number,
    updateData: Partial<CreateTherapistDto>,
  ): Therapist | null {
    const therapist = this.findOne(id);
    if (!therapist) {
      return null;
    }

    Object.assign(therapist, updateData);
    return therapist;
  }

  remove(id: number): boolean {
    const index = this.therapists.findIndex((therapist) => therapist.id === id);
    if (index === -1) {
      return false;
    }
    this.therapists.splice(index, 1);
    return true;
  }
}
