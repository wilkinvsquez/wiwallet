import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cors and security
  app.use(helmet()); // Security middleware
  app.useGlobalInterceptors(new TransformInterceptor()); // Interceptor for response transformation
  app.enableCors(); // Allow requests from Expo frontend
  const reflector: Reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector)); // JWT authentication guard
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
void bootstrap();
