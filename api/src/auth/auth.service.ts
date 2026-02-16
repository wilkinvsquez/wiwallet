import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  /**
   * Login method to validate user credentials
   * @param email User email
   * @param pass User password
   * @returns JWT Access Token & User Data
   */
  async login(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: this.jwtService.sign(payload),
        user: { id: user.id, email: user.email, name: user.name }
      };
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }

  /**
   * Register method to create a new user
   * @param email User email
   * @param pass User password
   * @param name User name
   * @returns JWT Access Token & User Data
   */
  async register(email: string, pass: string, name?: string) {
    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt);
    const user = await this.userService.create({ email, password: hashedPassword, name });
    return {
      message: 'Usuario creado con éxito',
      userId: user.id
    };
  }
}
