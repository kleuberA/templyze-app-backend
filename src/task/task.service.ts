import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService) { } 4

    async getAllTasksByUserId(userId: string) {

        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            }
        })

        if (!user) {
            throw new Error('User not found!');
        }

        return this.prisma.task.findMany({
            where: {
                userId,
            },
        });
    }

}
