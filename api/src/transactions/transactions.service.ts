import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>
  ) {}

  /**
   * Create a new transaction
   * @param userId User ID (for security)
   * @param transactionData Transaction data
   * @returns Created transaction
   */
  async create(userId: string, transactionData: Partial<Transaction>): Promise<Transaction> {
    const transaction = this.transactionsRepository.create({
      ...transactionData,
      user: { id: userId } as User
    });
    return this.transactionsRepository.save(transaction);
  }

  /**
   * Update a transaction
   * @param transactionId Transaction ID
   * @param userId User ID (for security)
   * @param updateData Data to update
   * @returns Updated transaction
   */
  async update(transactionId: string, userId: string, updateData: Partial<Transaction>): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({
      where: { id: transactionId, user: { id: userId } }
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    Object.assign(transaction, updateData);
    return this.transactionsRepository.save(transaction);
  }

  /**
   * Delete a transaction
   * @param transactionId Transaction ID
   * @param userId User ID (for security)
   */
  async delete(transactionId: string, userId: string): Promise<void> {
    const result = await this.transactionsRepository.delete({
      id: transactionId,
      user: { id: userId }
    });

    if (result.affected === 0) {
      throw new Error('Transaction not found');
    }
  }

  /**
   * Find all transactions by user
   * @param userId User ID (for security)
   * @returns Array of transactions
   */
  async findAllByUser(userId: string): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' }
    });
  }

  /**
   * Get balance for both monthly and current quincena
   * @param userId User ID
   * @returns Monthly and Quincenal balance data
   */
  async getMonthlyBalance(userId: string): Promise<any> {
    const now = new Date();
    const day = now.getDate();

    // Monthly range
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Quincenal range
    let qStartDate: Date;
    let qEndDate: Date;

    if (day <= 15) {
      qStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
      qEndDate = new Date(now.getFullYear(), now.getMonth(), 15, 23, 59, 59);
    } else {
      qStartDate = new Date(now.getFullYear(), now.getMonth(), 16);
      qEndDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    }

    const transactions = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .where('transaction.userId = :userId', { userId })
      .andWhere('transaction.createdAt >= :startOfMonth', { startOfMonth })
      .getMany();

    // Monthly totals
    const monthlyIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
    const monthlyExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);

    // Quincenal totals (actual transactions in period)
    const qTransactions = transactions.filter(t => {
      const date = new Date(t.createdAt);
      return date >= qStartDate && date <= qEndDate;
    });

    const qIncome = qTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
    const qExpenses = qTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      monthly: { income: monthlyIncome, expenses: monthlyExpenses, balance: monthlyIncome - monthlyExpenses },
      quincenal: { income: qIncome, expenses: qExpenses, balance: qIncome - qExpenses }
    };
  }
}
