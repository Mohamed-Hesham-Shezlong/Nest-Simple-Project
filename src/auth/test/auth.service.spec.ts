import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockResolvedValue({
              id: 1,
              name: 'Test User',
              email: 'test@gmail.com',
              password: 'hashedPassword',
            }),
            findOne: jest.fn().mockResolvedValue(null), // No existing user by default
            find: jest.fn(),
            delete: jest.fn(),
            create: jest.fn().mockReturnValue({
              id: 1,
              name: 'Test User',
              email: 'test@gmail.com',
              password: 'hashedPassword',
            }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mock-jwt-token'),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should register a user', async () => {
    const registerDto: RegisterDto = {
      name: 'Test User',
      email: 'test@gmail.com',
      password: 'password123Aa',
    };

    const result = await authService.register(registerDto);

    expect(result).toBeDefined();
    expect(result.user).toBeDefined();
    expect(result.token).toBe('mock-jwt-token');
    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { email: registerDto.email },
    });
    expect(userRepository.create).toHaveBeenCalledWith(registerDto);
    expect(userRepository.save).toHaveBeenCalled();
  });

  it('should throw BadRequest when user already exists', async () => {
    // Mock findOne to return an existing user
    (userRepository.findOne as jest.Mock).mockResolvedValueOnce({
      id: 1,
      email: 'test@gmail.com',
      name: 'Existing User',
    });

    const registerDto: RegisterDto = {
      name: 'Test User',
      email: 'test@gmail.com',
      password: 'password123Aa',
    };

    await expect(authService.register(registerDto)).rejects.toThrow(
      BadRequestException,
    );
    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { email: registerDto.email },
    });
  });
});
