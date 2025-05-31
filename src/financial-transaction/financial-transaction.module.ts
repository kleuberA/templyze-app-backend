import { Module } from '@nestjs/common';
import { FinancialTransactionService } from './financial-transaction.service';
import { FinancialTransactionController } from './financial-transaction.controller';

@Module({
  providers: [FinancialTransactionService],
  controllers: [FinancialTransactionController]
})
export class FinancialTransactionModule {}
