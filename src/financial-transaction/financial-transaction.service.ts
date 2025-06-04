import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FinancialTransactionService {
    constructor(private readonly prisma: PrismaService) { }

    async getFinancialTransactionsByUserId(userId: string) {

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error('User not found!');
        }

        return this.prisma.financialTransaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async getFinancialTransactionById(id: string) {
        const transaction = await this.prisma.financialTransaction.findUnique({
            where: { id },
        });

        if (!transaction) {
            throw new Error('Financial transaction not found!');
        }

        return transaction;
    }

    async createFinancialTransaction(userId: string, data: any) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error('User not found!');
        }

        return this.prisma.financialTransaction.create({
            data: {
                ...data,
                userId,
            },
        });
    }

    async updateFinancialTransaction(id: string, data: any) {
        const transaction = await this.prisma.financialTransaction.findUnique({
            where: { id },
        });

        if (!transaction) {
            throw new Error('Financial transaction not found!');
        }

        return this.prisma.financialTransaction.update({
            where: { id },
            data,
        });
    }

}
