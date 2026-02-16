import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

export interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
  };
}
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  /**
   * Create a new transaction
   * @param req Request with user data
   * @param body Transaction data
   * @returns Created transaction
   */
  @Post()
  async create(@Request() req: RequestWithUser, @Body() body: { amount: number; category: string; description?: string; type: 'income' | 'expense' }) {
    return this.transactionsService.create(req.user.userId, body);
  }

  /**
   * Get all transactions for the authenticated user
   * @param req Request with user data
   * @returns List of transactions
   */
  @Get()
  async findAll(@Request() req: RequestWithUser) {
    return this.transactionsService.findAllByUser(req.user.userId);
  }

  /**
   * Get monthly balance for the authenticated user
   * @param req Request with user data
   * @returns Monthly balance (income, expenses, balance)
   */
  @Get('balance')
  async getBalance(@Request() req: RequestWithUser) {
    return this.transactionsService.getMonthlyBalance(req.user.userId);
  }
}
