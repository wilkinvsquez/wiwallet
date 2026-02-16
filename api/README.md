<div align="center">
  <h1>💰 WiWallet API</h1>
  <p>Backend REST API para la aplicación de gestión financiera personal WiWallet</p>
  
  ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
  ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
</div>

---

## 📖 Descripción

API REST construida con **NestJS** y **TypeScript** que proporciona servicios de autenticación, gestión de usuarios y análisis financiero con inteligencia artificial para la aplicación móvil WiWallet.

### ✨ Características principales

- 🔐 **Autenticación JWT** - Sistema seguro de autenticación con tokens
- 👤 **Gestión de usuarios** - Registro, login y administración de perfiles
- 🤖 **Análisis con IA** - Integración con Google Generative AI para análisis financiero
- 🗄️ **Base de datos SQLite** - Persistencia de datos con TypeORM
- 🛡️ **Seguridad** - Implementación de Helmet y bcrypt para protección
- 📊 **Respuestas estandarizadas** - Interceptores para formato consistente de respuestas

---

## 🏗️ Arquitectura

```
api/
├── src/
│   ├── ai/                    # Módulo de inteligencia artificial
│   ├── auth/                  # Autenticación y autorización
│   │   ├── decorators/        # Decoradores personalizados (@Public)
│   │   ├── guards/            # Guards de autenticación JWT
│   │   └── interfaces/        # Interfaces de tokens y payloads
│   ├── common/                # Recursos compartidos
│   │   └── interceptors/      # Interceptores de transformación
│   ├── interfaces/            # Interfaces globales
│   ├── services/              # Servicios de cálculos financieros
│   ├── users/                 # Gestión de usuarios
│   │   └── entities/          # Entidades de base de datos
│   ├── app.module.ts          # Módulo principal
│   └── main.ts                # Punto de entrada
├── test/                      # Tests E2E
└── database.sqlite            # Base de datos SQLite
```

---

## 🚀 Inicio rápido

### Prerequisitos

- **Node.js** >= 18.x
- **npm** >= 9.x

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Navegar al directorio del API
cd wiwallet/api

# Instalar dependencias
npm install
```

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto API:

```env
# JWT Configuration
JWT_SECRET=tu_clave_secreta_super_segura_aqui
JWT_EXPIRES_IN=7d

# Google AI
GOOGLE_AI_API_KEY=tu_api_key_de_google_ai

# Server
PORT=3000
```

### Ejecutar en desarrollo

```bash
# Modo desarrollo con hot-reload
npm run start:dev

# Modo debug
npm run start:debug
```

El servidor estará disponible en `http://localhost:3000`

---

## 📜 Scripts disponibles

| Script                | Descripción                           |
| --------------------- | ------------------------------------- |
| `npm run start`       | Inicia el servidor en modo producción |
| `npm run start:dev`   | Inicia con hot-reload para desarrollo |
| `npm run start:debug` | Inicia en modo debug                  |
| `npm run build`       | Compila el proyecto para producción   |
| `npm run format`      | Formatea el código con Prettier       |
| `npm run lint`        | Ejecuta ESLint y corrige errores      |
| `npm run test`        | Ejecuta tests unitarios               |
| `npm run test:watch`  | Ejecuta tests en modo watch           |
| `npm run test:cov`    | Genera reporte de cobertura           |
| `npm run test:e2e`    | Ejecuta tests end-to-end              |

---

## 🔌 Endpoints principales

### Autenticación

```http
POST /auth/register
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "name": "Nombre Usuario"
}
```

```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

### Usuarios (requiere autenticación)

```http
GET /users/profile
Authorization: Bearer <token>
```

### Respuestas estandarizadas

Todas las respuestas siguen el formato:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operación exitosa",
  "timestamp": "2026-02-16T17:38:23.000Z"
}
```

---

## 🛠️ Stack tecnológico

### Core

- **[NestJS](https://nestjs.com/)** v11 - Framework progresivo de Node.js
- **[TypeScript](https://www.typescriptlang.org/)** v5.7 - Superset tipado de JavaScript
- **[TypeORM](https://typeorm.io/)** v0.3 - ORM para TypeScript

### Base de datos

- **[SQLite3](https://www.sqlite.org/)** v5.1 - Base de datos embebida

### Autenticación y seguridad

- **[@nestjs/jwt](https://www.npmjs.com/package/@nestjs/jwt)** - Manejo de JWT
- **[@nestjs/passport](https://www.npmjs.com/package/@nestjs/passport)** - Estrategias de autenticación
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Hash de contraseñas
- **[helmet](https://helmetjs.github.io/)** - Seguridad HTTP headers

### IA y servicios

- **[@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)** - Google Gemini AI

### Desarrollo

- **[ESLint](https://eslint.org/)** - Linter de código
- **[Prettier](https://prettier.io/)** - Formateador de código
- **[Jest](https://jestjs.io/)** - Framework de testing

---

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests con watch mode
npm run test:watch

# Cobertura de código
npm run test:cov

# Tests E2E
npm run test:e2e
```

---

## 📦 Build para producción

```bash
# Compilar el proyecto
npm run build

# Ejecutar en producción
npm run start:prod
```

El código compilado se generará en el directorio `dist/`.

---

## 🔒 Seguridad

- ✅ Autenticación JWT con tokens seguros
- ✅ Hash de contraseñas con bcrypt (salt rounds: 10)
- ✅ Helmet para headers de seguridad HTTP
- ✅ CORS habilitado para frontend Expo
- ✅ Guards globales para protección de rutas
- ✅ Decorador `@Public()` para rutas públicas

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es privado y no tiene licencia pública.

---

## 👨‍💻 Autor

**Wilkin Vásquez**

---

## 📞 Soporte

Para preguntas o problemas, por favor abre un issue en el repositorio.

---

<div align="center">
  <p>Hecho con ❤️ usando NestJS</p>
</div>
