import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserappService {
    constructor(private readonly prisma: PrismaService) { }

    async getUserInfoById(userID: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userID },
            include: {
                purchases: true,
            },
        })

        if (!user) {
            throw new Error('User not found');
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            purchases: user.purchases
        };

    }

}
