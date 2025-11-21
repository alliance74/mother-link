# Mobile Health Worker Backend Documentation

## Overview
This backend exposes RESTful endpoints that let mobile health workers register, authenticate, and manage mothers plus related operational data from the MotherLink mobile application. It focuses exclusively on health worker workflows; organization- or admin-level capabilities are out of scope.

---

## 1. Authentication Endpoints

### Register Mobile Health Worker
- **Endpoint**: `POST /mobile/healthworkers/register`
- **Required JSON Fields**
  - `chwId` (string) – unique health worker identifier
  - `fullName` (string)
  - `gender` (string)
  - `email` (string) – unique, validated format
  - `nationalId` (string) – unique per person
  - `cell` (string)
  - `village` (string)
  - `district` (string)
  - `sector` (string)
  - `phoneNumber` (string)
  - `dateJoined` (string, ISO `YYYY-MM-DD`)
  - `status` (string) – e.g., `Active`
  - `password` (string) – must be hashed before persistence

### Login Mobile Health Worker
- **Endpoint**: `POST /mobile/healthworkers/login`
- **Required JSON Fields**
  - `email` (string)
  - `password` (string)

---

## 2. Mother Management

### Create Mother Record
- **Endpoint**: `POST /mobile/healthworkers/createMother`
- **Body Fields** *(as defined by the mother schema)*:
  - `fullName` (string)
  - `nationalId` (string)
  - `phoneNumber` (string)
  - `status` (string)
  - plus additional identifiers/contact details captured in Swagger docs.

### Update Mother Record
- **Endpoint**: `PUT /mobile/healthworkers/update/{id}`
- **URL Param**: `id` (string) – existing mother ID
- **Body**: Any editable fields from the mother schema.

### Delete Mother Record
- **Endpoint**: `DELETE /mobile/healthworkers/delete/{id}`
- **URL Param**: `id` (string)

### Get All Mothers
- **Endpoint**: `GET /mobile/healthworkers/allMothers`
- **Response**: Array of mother records assigned to the authenticated health worker.

### Get Total Count of Mothers
- **Endpoint**: `GET /mobile/healthworkers/totalMothers`
- **Response**: Numeric total for mothers under the worker’s care.

---

## 3. Appointments & Notifications

### Get Upcoming Appointments
- **Endpoint**: `GET /mobile/healthworkers/appointments/upcoming`
- **Response**: List of scheduled appointments tied to the worker’s mothers.

### Get Today’s Notifications
- **Endpoint**: `GET /mobile/healthworkers/notifications/today`
- **Response**: Notifications relevant to the worker and their associated households/mothers.

---

## 4. Health Worker Account Update

### Update Own Profile
- **Endpoint**: `PUT /mobile/healthworkers/updateProfile`
- **Body**: Any updatable fields from the registration payload (e.g., contact info, status).

---

## 5. Data & Security Requirements
- **Validation**: Enforce strict typing, min/max lengths, and uniqueness on `email`, `nationalId`, and `chwId`.
- **Security**:
  - Hash passwords (e.g., bcrypt) before storage.
  - Use JWT or equivalent secure tokens for session management.
  - Protect all non-auth endpoints with authentication middleware.
- **Authorization**: Scope queries (mothers, appointments, notifications) to the authenticated worker.
- **Error Handling**: Return consistent JSON envelopes with `status`, `message`, and optional `data`/`errors`. Distinguish validation failures, duplicate conflicts, unauthorized access, and missing resources.
- **Persistence**: Store records in a durable datastore (e.g., PostgreSQL) with relations linking health workers to mothers, appointments, visits, and notifications.
- **CORS**: Configure to allow requests from the mobile app origins (Expo dev URLs and production domain).

---

## Additional Notes
- Provide Swagger or similar API documentation with sample requests/responses.
- Standardize timestamps (ISO 8601) and use UTC internally.
- Log authentication attempts and administrative actions for auditability.
- Include rate limiting and monitoring on auth-sensitive routes to detect abuse.

---

## Local Development
1. Copy `env.example` to `.env` and fill in Supabase credentials plus a strong `JWT_SECRET`.
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Run the server in development mode:
   ```bash
   npm run dev
   ```
4. The API will default to `http://localhost:4000/api`. Use the `/health` endpoint to verify the service is running.

### Environment Variables
| Name | Description |
|------|-------------|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key used for server-side Supabase access |
| `JWT_SECRET` | Secret string for signing JWT access tokens |
| `PORT` | (Optional) Port for Express server (default `4000`) |

### Database Tables (Suggested)
Ensure Supabase has the following tables (simplified view):
- `mobile_health_workers`: columns for registration fields plus `password_hash`.
- `mothers`: relates to `mobile_health_workers` via `healthWorkerId`.
- `appointments`: includes `healthWorkerId`, `motherId`, `scheduledAt`, `status`.
- `notifications`: includes `healthWorkerId`, `message`, `createdAt`.

Define row-level security policies so each worker only accesses their own records.


