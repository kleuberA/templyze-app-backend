import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FinancialTransactionService {
    constructor(private readonly prisma: PrismaService) { }

    async getFinancialTransactionsByUserId(userId: string) {
        return this.prisma.financialTransaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

}
