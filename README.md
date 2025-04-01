# Sistema de Gestión de Usuarios y Productos con Microservicios

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![NATS](https://img.shields.io/badge/NATS-2C3E50?style=for-the-badge&logo=nats&logoColor=white)](https://nats.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

Aplicación basada en microservicios para gestionar usuarios y productos, utilizando **NestJS**, **NATS** para comunicación entre servicios, y **PostgreSQL** como base de datos.

---

## 🚀 Características Principales

- **Arquitectura de Monorepositorio**: Dependencias centralizadas en el módulo principal.
- **Servicios**:
  - `users-service`: Gestión de usuarios (registro, login, roles).
  - `products-service`: Gestión de productos (creación, consulta por usuario).
  - `api-gateway`: Punto de entrada HTTP con autenticación JWT.
- **Comunicación Asíncrona**: Mensajería entre servicios mediante **NATS**.
- **Seguridad**: Autenticación JWT y control de roles (`admin`/`user`).

---

## 🛠️ Tecnologías Utilizadas

||----------------------------------------------------------||
|| Tecnología           || Uso                              ||
||----------------------||----------------------------------||
|| **NestJS**           || Framework principal              ||
|| **NATS**             || Comunicación entre microservicios||
|| **PostgreSQL**       || Almacenamiento de datos          ||
|| **TypeORM**          || ORM para bases de datos          ||
|| **Docker**           || Contenerización de servicios     ||

---

## 📦 Prerrequisitos

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)
- [Nest CLI](https://docs.nestjs.com/cli/overview) (`npm i -g @nestjs/cli`)

---

## 🔧 Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/microservices-app.git  // moficiar con el repo ojo!!
   cd micro-services

2. **Instalar Dependencias** 
```
npm install (desde la raíz)
```

3. **Configurar Variables de entorno**
```
Copiar y renombrar .env.template a .env 
```
```
Editar .env con tus credenciales
```

4. **Ejecución con Docker (Servicios)**
```
docker-compose up -d 
```

5. **Iniciar microservicios**
```
# API Gateway
npm run start api-gateway

# Users Service
npm run start users-service

# Products Service
npm run start products-service
```