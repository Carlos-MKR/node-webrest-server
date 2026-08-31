# Guía de Instalación y Configuración desde Cero

Esta guía contiene todos los pasos, comandos y configuraciones necesarias para inicializar y ejecutar este proyecto con Node.js, TypeScript, Express, Docker (PostgreSQL) y Prisma ORM (v7+).

---

## 1. Inicialización y Dependencias

### Inicializar el proyecto
```bash
npm init -y
```

### Instalar dependencias de desarrollo
```bash
npm install -D typescript @types/node tsx rimraf @types/express @types/pg
```

### Instalar Express y librerías auxiliares
```bash
npm install express dotenv env-var pg @prisma/adapter-pg
```

---

## 2. Configuración de TypeScript y Módulos (ESM)

### `package.json`
Asegúrate de agregar `"type": "module"` y los scripts correspondientes:

```json
{
  "name": "07-restweb",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/app.ts",
    "build": "rimraf ./dist && tsc",
    "start": "npm run build && node dist/app.js"
  }
}
```

### `tsconfig.json`
Crea o actualiza el archivo `tsconfig.json` con la siguiente configuración:

```json
{
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist/",
    "module": "nodenext",
    "moduleResolution": "bundler",
    "target": "esnext",
    "types": ["node"],
    "strict": true,
    "skipLibCheck": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true
  },
  "include": ["src/**/*"]
}
```

---

## 3. Variables de Entorno y Docker

### Archivo `.env`
Crea el archivo `.env` en la raíz:

```env
PORT=3000
PUBLIC_PATH=public

POSTGRES_URL=postgresql://postgres:123456@localhost:5432/TODO
POSTGRES_USER=postgres
POSTGRES_DB=TODO
POSTGRES_PORT=5432
POSTGRES_PASSWORD=123456

NODE_ENV=development
```

### Archivo `docker-compose.yml`
```yaml
services:
  postgres-db:
    image: postgres:15.3
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - ./postgres:/var/lib/postgresql/data
    ports:
      - 5432:5432
```

### Levantar el contenedor de base de datos
```bash
docker compose up -d
```

---

## 4. Instalación y Configuración de Prisma (v7+)

### Instalar Prisma CLI, Prisma Client y Driver Adapter
```bash
npm install -D prisma@7.10.0
npm install @prisma/client@7.10.0 @prisma/adapter-pg pg
```

### Crear `prisma.config.ts`
En Prisma v7+, la URL de conexión se administra en `prisma.config.ts`:

```typescript
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('POSTGRES_URL') || env('DATABASE_URL'),
  },
});
```

### Crear `prisma/schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

model Todo {
  id          Int       @id @default(autoincrement())
  text        String    @db.VarChar()
  completedAt DateTime? @db.Timestamp()
}
```

### Instanciar PrismaClient con Driver Adapter (`src/data/postgres/index.ts`)
```typescript
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { envs } from "../../config/envs.js";

const adapter = new PrismaPg({
    connectionString: envs.POSTGRES_URL,
});

export const prisma = new PrismaClient({ adapter });
```

---

## 5. Migraciones y Generación del Cliente

```bash
# Crear y aplicar la migración en la base de datos
npx prisma migrate dev --name init

# Generar los tipos del cliente de Prisma
npx prisma generate
```

---

## 6. Comandos de Ejecución

```bash
# Iniciar en modo desarrollo (con auto-reload vía TSX)
npm run dev

# Compilar para producción
npm run build

# Iniciar la aplicación compilada
npm start
```
