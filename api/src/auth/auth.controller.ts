import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Login
   * @param loginDto Email & Password DTO
   * @returns JWT Access Token & User Data
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  /**
   * Register method to create a new user
   * @param userDto Email, Password & Name DTO
   * @returns JWT Access Token & User Data
   */
  @Public()
  @Post('register')
  async register(@Body() userDto: { email: string; password: string; name?: string }) {
    return this.authService.register(userDto.email, userDto.password, userDto.name);
  }
}
