import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Simulación de una base de datos de usuarios
  private users = [
    {
      id: 1,
      email: 'admin@wiwallet.com',
      password: '' // Se llenará con el hash de '123456'
    }
  ];

  login(email: string, pass: string) {
    // 1. Buscar usuario
    const user = this.users.find(u => u.email === email);

    // 2. Comparar contraseñas (uso temporal de texto plano para el admin de prueba,
    // pero idealmente siempre usamos bcrypt)
    if (user && pass === '123456') {
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: this.jwtService.sign(payload),
        user: { id: user.id, email: user.email }
      };
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }
}
