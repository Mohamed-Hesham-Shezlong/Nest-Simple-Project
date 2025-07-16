import {
  IsString,
  IsEmail,
  IsNumber,
  IsArray,
  Min,
  Max,
  MinLength,
  MaxLength,
  ArrayMinSize,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateTherapistDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  specialization: string;

  @IsNumber({
    maxDecimalPlaces: 1,
  })
  @IsOptional()
  @Min(0)
  @Max(50)
  yearsOfExperience: number = 0; // set default value to 0

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(500)
  education: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  bio: string;

  @IsNumber()
  @Min(0)
  @Max(1000)
  hourlyRate: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  languages: string[];
}
