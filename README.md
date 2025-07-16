# Mini-Shezlong

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

A practice project implementing core NestJS concepts.

## NestJS Concepts

- **Modules** - Feature organization and encapsulation
- **Controllers** - HTTP request handling and routing
- **Services** - Business logic and data management
- **DTOs** - Data validation and type safety
- **Interfaces** - TypeScript type definitions
- **Dependency Injection** - Service management and injection

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
  sample request

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
