import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('therapists')
export class Therapist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 50 })
  specialization: string;

  @Column()
  yearsOfExperience: number;

  @Column({ type: 'text' })
  education: string;

  @Column({ type: 'text' })
  bio: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  hourlyRate: number;

  @Column('simple-array')
  languages: string[];

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
