# Mini-Shezlong

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

A practice project implementing core NestJS concepts.

## NestJS Concepts I'm learning & Applying

- **Interceptors**

  Used for

  1- made a logging intercepter to log Request Details
  - example

```
[Nest] 199568  - 07/16/2025, 3:46:12 PM     LOG [LoggingInterceptor] POST /api/v1/therapists [TherapistsController.create] - 14ms
```

2- Transfor Interceptor for standarizing the response returned

```json
{
    "status": "success",
    "data": {
        ...
    }
}
```

- **Validation and pipes**

used class validator and class transformer for validating DTOs

## Project Setup

```bash
# Install dependencies
$ pnpm install

# Run in development mode
$ pnpm run start:dev

# Run in production mode
$ pnpm run start:prod
```

## API Endpoints

There is a "api/v1" global prefix for evey endpoint

- `POST /therapists` - Create a new therapist

- sample request

```json
{
  "name": "Dr. Mohamed",
  "email": "mohamed@gmail.com",
  "specialization": "CBT",
  "yearsOfExperience": 1,
  "education": "Ph.D. in Clinical Psychology from Cairo University",
  "bio": "therapy services...",
  "hourlyRate": 20,
  "languages": ["English", "Arabic"]
}
```

- `GET /therapists` - Get all therapists
- `GET /therapists/:id` - Get a specific therapist
- `PUT /therapists/:id` - Update a therapist
- `DELETE /therapists/:id` - Delete a therapist
