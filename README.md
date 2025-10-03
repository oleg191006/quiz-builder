# Quiz Builder App

Quiz Builder App — це повнофункціональний веб-застосунок для створення, перегляду та управління користувацькими вікторинами. 

## Технології

**Бекенд:** Nest.js, TypeScript, PostgreSQL, Prisma, Docker

**Фронтенд:** Next, TypeScript, Tailwind, Axios, Zod, React Hook Form

## Вимоги

Перед початком роботи переконайтесь, що у вас встановлено: Node.js (18.x+), npm, Docker, Git

## Налаштування та запуск проекту

### 1. Клонування репозиторію

```bash
git clone https://github.com/oleg191006/quiz-builder.git
cd quiz-builder
```

2. Налаштування бекенду (Nest.js)

```bash
cd backend
```

3.Створіть файл .env у корені папки backend:

```bash
# -------------------------
# Database Configuration
# -------------------------
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_HOST=localhost
POSTGRES_DATABASE=quiz
POSTGRES_PORT=5435
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}?schema=public"
# -------------------------
# Frontend URL (CORS)
# -------------------------
CLIENT_URL='http://localhost:3000'
```

4.Встановіть залежності та згенеруйте Prisma Client:

```bash
npm install
npx prisma generate
```

5.Запустіть базу даних PostgreSQL через Docker:

```bash
docker-compose up -d
```

6.Запустіть бекенд:

```bash
npm run start:dev
```

3. Налаштування фронтенду (React)

```bash
cd frontend
```

1.Створіть .env файл у корені frontend:

```bash
NEXT_PUBLIC_API_BASE_PATH=http://localhost:3001
```

2.Встановіть залежності та запустіть фронтенд:

```bash
npm install
npm run dev
```

Фронтенд доступний за http://localhost:3000

