# RESTWeb Todo API

Una API RESTful profesional y escalable para la gestión de "Todos" (tareas), construida con **Node.js, Express y TypeScript** siguiendo los principios de **Clean Architecture**.

## 🚀 Características

*   **Arquitectura Limpia (Clean Architecture):** Separación estricta de responsabilidades en capas (`Domain`, `Infrastructure`, `Presentation`).
*   **TypeScript:** Tipado estático para un código más robusto, seguro y fácil de mantener.
*   **Prisma ORM:** Manejo eficiente e intuitivo de la base de datos PostgreSQL, incluyendo migraciones seguras y tipado automático.
*   **PostgreSQL & Docker:** Entorno local fácil de configurar mediante `docker-compose`.
*   **Testing Automatizado:** Pruebas de integración completas implementadas con **Jest** y **Supertest** (100% de los endpoints testeados).
*   **Build Optimizado:** Empaquetado rápido y eficiente para producción utilizando `tsup`.
*   **Validación de Entorno:** Configuración robusta de variables de entorno usando `env-var`.

## 🛠️ Tecnologías Utilizadas

*   **Backend:** Node.js, Express
*   **Lenguaje:** TypeScript
*   **Base de Datos:** PostgreSQL
*   **ORM:** Prisma
*   **Testing:** Jest, Supertest
*   **Contenedores:** Docker, Docker Compose
*   **Build Tool:** tsup, tsx

## ⚙️ Requisitos Previos

*   [Node.js](https://nodejs.org/) (v18+)
*   [Docker](https://www.docker.com/) y Docker Compose (para la base de datos local)

## 📖 Instrucciones de Instalación y Ejecución

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. **Clonar el repositorio y entrar al directorio:**
   ```bash
   # clona el repositorio
   cd 07-RESTWeb
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**
   - Copia el archivo de ejemplo `.env.template` y renómbralo a `.env`.
   - Modifica las variables en el `.env` si es necesario (por defecto vienen configuradas para el Docker local).

4. **Levantar la base de datos local con Docker:**
   Asegúrate de tener Docker corriendo en tu sistema y ejecuta:
   ```bash
   docker-compose up -d
   ```

5. **Ejecutar las migraciones de Prisma:**
   Esto creará las tablas necesarias en la base de datos PostgreSQL.
   ```bash
   npx prisma migrate dev
   ```

6. **Ejecutar el proyecto en modo Desarrollo:**
   ```bash
   npm run dev
   ```
   El servidor iniciará en `http://localhost:3000` (o el puerto configurado en el `.env`).

## 🧪 Testing

El proyecto incluye una suite de pruebas de integración para garantizar que los endpoints funcionen correctamente.

1. Asegúrate de tener un archivo `.env.test` configurado con la base de datos de pruebas.
2. Ejecuta los tests con el siguiente comando:
   ```bash
   npm run test
   ```

## 📦 Construcción para Producción

Para compilar el proyecto a JavaScript (ESM) optimizado para producción:

```bash
npm run build
```
Esto limpiará la carpeta `dist/` y generará la versión de producción.

Para ejecutar la versión de producción:
```bash
npm start
```
*(Nota: `npm start` también ejecutará `prisma migrate deploy` de forma automática).*