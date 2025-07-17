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

- **Exception Filters**

- made global exception filter to standarize errors responses

- made validation exception filter to standarize validation errors (bad requests)

- **GUARDS**

## Project Setup

I switched to docker to add the mariaDB database
The project consists of two main containers:

- **NestJS Application**
- **MariaDB Database**

### Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd Nest-Simple-Project
```

2. Create a `.env` file in the root directory (use `.env.example` as a template):

```bash
cp .env.example .env
```

3. Start the containers:

```bash
## run the containers
docker compose up -d
```

4. The application will be available at:

- API: `http://localhost:{PORT_IN_ENV || 3000 by default}`
- Database: `localhost:3306`

## Authentication

The application uses JWT (JSON Web Token) based authentication. Users can register, login, and access protected endpoints using JWT tokens.

### User Roles

There are two types of users:

- `USER`: Regular user with limited access
- `ADMIN`: Administrator with full access to therapist management

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
