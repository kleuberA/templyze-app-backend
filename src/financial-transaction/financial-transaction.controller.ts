import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { FinancialTransactionService } from './financial-transaction.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('financial-transaction')
export class FinancialTransactionController {
    constructor(private readonly financialService: FinancialTransactionService) { }

    @ApiBearerAuth()
    @Get('/get-financial-transactions-by-user-id/:userId')
    async getFinancialTransactionsByUserId(@Param('userId') userID: string, @Res() resp) {
        try {
            const priorities = await this.financialService.getFinancialTransactionsByUserId(userID);
            return resp.status(200).json({ message: "Financial transactions fetched successfully!", priorities });
        } catch (error) {
            return resp.status(400).json({ message: "Failed to fetch Financial transactions!", error: error.message });
        }
    }

    @ApiBearerAuth()
    @Get('/get-financial-transactions-by-id/:id')
    async getFinancialTransactionsById(@Param('id') id: string, @Res() resp) {
        try {
            const financialTransaction = await this.financialService.getFinancialTransactionById(id);
            return resp.status(200).json({ message: "Financial transaction fetched successfully!", financialTransaction });
        } catch (error) {
            return resp.status(400).json({ message: "Failed to fetch Financial transaction!", error: error.message });
        }
    }

    @ApiBearerAuth()
    @Post('/create-financial-transaction/:userId')
    async createFinancialTransaction(@Body() financialTransactionData, @Res() resp, @Param('userId') userId: string) {
        try {
            const financialTransaction = await this.financialService.createFinancialTransaction(userId, financialTransactionData);
            return resp.status(201).json({ message: "Financial transaction created successfully!", financialTransaction });
        } catch (error) {
            return resp.status(400).json({ message: "Failed to create Financial transaction!", error: error.message });
        }
    }

}
