import { Controller, Get, Put, Body, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { TaxService } from 'src/services/tax.service';

export interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * Get user settings
   * @param req Request with user data
   * @returns User settings
   */
  @Get('settings')
  async getSettings(@Request() req: RequestWithUser) {
    return this.usersService.getSettings(req.user.userId);
  }

  /**
   * Update user settings
   * @param req Request with user data
   * @param body Settings data
   * @returns Updated settings
   */
  @Put('settings')
  async updateSettings(@Request() req: RequestWithUser, @Body() body: { monthlySalary?: number; hasCompletedOnboarding?: boolean }) {
    return this.usersService.updateSettings(req.user.userId, body);
  }

  /**
   * Calculate salary deductions
   * @param req Request with user data
   * @returns Salary breakdown with deductions
   */
  @Get('salary-breakdown')
  async getSalaryBreakdown(@Request() req: RequestWithUser) {
    const settings = await this.usersService.getSettings(req.user.userId);
    return TaxService.calculateNetSalary(settings.monthlySalary);
  }
}
