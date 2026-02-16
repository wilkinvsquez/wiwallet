import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserSettings } from './entities/user-settings.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserSettings)
    private userSettingsRepository: Repository<UserSettings>
  ) {}

  /**
   * Create a new user
   * @param userData User data
   * @returns Created user
   */
  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  /**
   * Find user by email
   * @param email User email
   * @returns User or null
   */
  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  /**
   * Get or create user settings
   * @param userId User ID
   * @returns User settings
   */
  async getSettings(userId: string): Promise<UserSettings> {
    let settings = await this.userSettingsRepository.findOne({
      where: { user: { id: userId } }
    });
    if (!settings) {
      settings = this.userSettingsRepository.create({
        user: { id: userId } as User,
        monthlySalary: 0,
        currency: 'CRC',
        hasCompletedOnboarding: false
      });
      await this.userSettingsRepository.save(settings);
    }
    return settings;
  }
  /**
   * Update user settings
   * @param userId User ID
   * @param settingsData Settings data to update
   * @returns Updated settings
   */
  async updateSettings(userId: string, settingsData: Partial<UserSettings>): Promise<UserSettings> {
    const settings = await this.getSettings(userId);
    Object.assign(settings, settingsData);
    return this.userSettingsRepository.save(settings);
  }
}
