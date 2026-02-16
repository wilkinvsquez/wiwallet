import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_settings')
export class UserSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  monthlySalary: number;

  @Column({ default: 'CRC' })
  currency: string;

  @Column({ default: false })
  hasCompletedOnboarding: boolean;
}
