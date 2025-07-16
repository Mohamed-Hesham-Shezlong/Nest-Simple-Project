export interface Therapist {
  id: number;
  name: string;
  email: string;
  specialization: string;
  yearsOfExperience: number;
  education: string;
  bio: string;
  isAvailable: boolean;
  hourlyRate: number;
  languages: string[];
  rating?: number;
}
