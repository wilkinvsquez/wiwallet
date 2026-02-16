<div align="center">
  <h1>📱 WiWallet UI</h1>
  <p>Aplicación móvil de gestión financiera personal con diseño "Calm Finance"</p>
  
  ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![iOS](https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white)
  ![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
</div>

---

## 📖 Descripción

Aplicación móvil multiplataforma construida con **React Native** y **Expo** que ofrece una experiencia premium para la gestión de finanzas personales. Diseñada con la estética "Calm Finance" que combina tranquilidad visual con funcionalidad robusta.

### ✨ Características principales

- 🎨 **Diseño Calm Finance** - Interfaz serena y profesional con gradientes suaves
- 🔐 **Autenticación segura** - Login y registro con JWT
- 📊 **Dashboard interactivo** - Visualización de finanzas en tiempo real
- 💳 **Gestión de transacciones** - Registro y categorización de gastos/ingresos
- 🤖 **Asistente IA** - Análisis financiero inteligente con Google AI
- 🌙 **Modo oscuro** - Soporte automático para tema claro/oscuro
- 📱 **Multiplataforma** - iOS, Android y Web

---

## 🏗️ Arquitectura

```
ui/
├── app/                       # Rutas de la aplicación (Expo Router)
│   ├── (main)/               # Rutas principales autenticadas
│   ├── (tabs)/               # Navegación por pestañas
│   ├── login.tsx             # Pantalla de inicio de sesión
│   ├── register.tsx          # Pantalla de registro
│   └── _layout.tsx           # Layout principal
├── components/               # Componentes reutilizables
│   ├── CustomAlert.tsx       # Sistema de alertas premium
│   ├── GradientBackground.tsx # Fondos con gradientes
│   ├── ThemedText.tsx        # Texto con temas
│   └── ...
├── context/                  # Context API
│   └── AuthContext.tsx       # Contexto de autenticación
├── hooks/                    # Custom hooks
│   ├── useColorScheme.ts     # Hook para tema
│   └── useThemeColor.ts      # Hook para colores
├── services/                 # Servicios API
│   └── api.ts                # Cliente HTTP con Axios
├── styles/                   # Estilos globales
│   └── colors.ts             # Paleta de colores
├── utils/                    # Utilidades
│   └── storage.ts            # Gestión de almacenamiento seguro
└── constants/                # Constantes de la app
```

---

## 🚀 Inicio rápido

### Prerequisitos

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Expo CLI** (se instala automáticamente)
- **Expo Go** app (para testing en dispositivo físico)

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Navegar al directorio del UI
cd wiwallet/ui

# Instalar dependencias
npm install
```

### Ejecutar en desarrollo

```bash
# Iniciar el servidor de desarrollo
npm start

# O usar comandos específicos:
npm run android    # Abrir en emulador Android
npm run ios        # Abrir en simulador iOS
npm run web        # Abrir en navegador web
```

Escanea el código QR con **Expo Go** (Android) o la app de **Cámara** (iOS) para ver la app en tu dispositivo.

---

## 📜 Scripts disponibles

| Script                  | Descripción                           |
| ----------------------- | ------------------------------------- |
| `npm start`             | Inicia el servidor de desarrollo Expo |
| `npm run android`       | Abre la app en emulador Android       |
| `npm run ios`           | Abre la app en simulador iOS          |
| `npm run web`           | Abre la app en navegador web          |
| `npm run lint`          | Ejecuta ESLint para verificar código  |
| `npm run reset-project` | Resetea el proyecto a estado inicial  |

---

## 🎨 Diseño "Calm Finance"

### Paleta de colores

```typescript
// Tema claro
primary: "#4A90E2"; // Azul sereno
secondary: "#7B68EE"; // Púrpura suave
background: "#F8FAFC"; // Blanco humo
text: "#1E293B"; // Gris oscuro

// Tema oscuro
primary: "#60A5FA"; // Azul brillante
secondary: "#A78BFA"; // Púrpura brillante
background: "#0F172A"; // Azul oscuro profundo
text: "#F1F5F9"; // Blanco suave
```

### Gradientes característicos

- **Login/Register**: Azul a púrpura suave
- **Dashboard**: Gradientes dinámicos según datos
- **Alertas**: Colores semánticos con opacidad

---

## 🔌 Integración con API

La aplicación se conecta al backend WiWallet API:

```typescript
// services/api.ts
const API_URL = "http://localhost:3000"; // Desarrollo
// const API_URL = 'https://api.wiwallet.com'; // Producción

// Ejemplo de uso
import api from "@/services/api";

const login = async (email: string, password: string) => {
	const response = await api.post("/auth/login", { email, password });
	return response.data;
};
```

### Autenticación

- Los tokens JWT se almacenan en **SecureStore** de Expo
- Se incluyen automáticamente en headers de peticiones autenticadas
- El contexto `AuthContext` maneja el estado global de autenticación

---

## 🛠️ Stack tecnológico

### Core

- **[React Native](https://reactnative.dev/)** v0.81 - Framework móvil
- **[Expo](https://expo.dev/)** v54 - Plataforma de desarrollo
- **[TypeScript](https://www.typescriptlang.org/)** v5.9 - Tipado estático
- **[Expo Router](https://docs.expo.dev/router/introduction/)** v6 - Navegación basada en archivos

### UI y Navegación

- **[@react-navigation/native](https://reactnavigation.org/)** - Navegación
- **[@react-navigation/bottom-tabs](https://reactnavigation.org/docs/bottom-tab-navigator/)** - Tabs inferiores
- **[expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)** - Gradientes
- **[@expo/vector-icons](https://icons.expo.fyi/)** - Iconos

### Servicios

- **[axios](https://axios-http.com/)** - Cliente HTTP
- **[expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/)** - Almacenamiento seguro
- **[expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)** - Feedback háptico

### Animaciones

- **[react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)** - Animaciones fluidas
- **[react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)** - Gestos

### Desarrollo

- **[ESLint](https://eslint.org/)** - Linter de código
- **[expo-dev-client](https://docs.expo.dev/develop/development-builds/introduction/)** - Build de desarrollo

---

## 📱 Características de la UI

### Pantallas principales

1. **Login** (`/login`)
    - Formulario con validación
    - Animaciones suaves
    - Feedback háptico

2. **Registro** (`/register`)
    - Validación en tiempo real
    - Sistema de alertas personalizado
    - Confirmación de contraseña

3. **Dashboard** (`/(tabs)/`)
    - Resumen financiero
    - Gráficos interactivos
    - Acceso rápido a funciones

4. **Transacciones** (`/(tabs)/transactions`)
    - Lista de movimientos
    - Filtros y búsqueda
    - Categorización

5. **Perfil** (`/(tabs)/profile`)
    - Información del usuario
    - Configuración
    - Cerrar sesión

---

## 🧩 Componentes principales

### CustomAlert

Sistema de alertas premium con animaciones y colores semánticos.

```tsx
<CustomAlert
	visible={showAlert}
	type='success'
	title='¡Éxito!'
	message='Operación completada'
	onClose={() => setShowAlert(false)}
/>
```

### GradientBackground

Fondos con gradientes personalizables.

```tsx
<GradientBackground colors={["#4A90E2", "#7B68EE"]}>
	{/* Contenido */}
</GradientBackground>
```

---

## 🔒 Seguridad

- ✅ Almacenamiento seguro de tokens con SecureStore
- ✅ Validación de formularios en cliente
- ✅ Comunicación HTTPS en producción
- ✅ Timeout de sesión automático
- ✅ Sanitización de inputs

---

## 📦 Build para producción

### Android

```bash
# Build APK
eas build --platform android

# Build AAB para Play Store
eas build --platform android --profile production
```

### iOS

```bash
# Build para TestFlight
eas build --platform ios

# Build para App Store
eas build --platform ios --profile production
```

---

## 🧪 Testing

```bash
# Ejecutar linter
npm run lint

# Testing manual con Expo Go
npm start
# Escanear QR con dispositivo
```

---

## 🌐 Configuración de entornos

Edita `app.json` para configurar:

- Nombre de la app
- Íconos y splash screen
- Permisos
- Configuración de build

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

## 🔗 Enlaces útiles

- [Documentación de Expo](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

<div align="center">
  <p>Hecho con ❤️ usando React Native y Expo</p>
</div>
