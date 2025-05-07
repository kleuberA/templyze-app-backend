import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserAppInfoByIdEntity } from './entity/userAppInfoById.entity';

@Injectable()
export class UserappService {
    constructor(private readonly prisma: PrismaService) { }

    async getUserInfoById(userID: string): Promise<UserAppInfoByIdEntity> {
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

    async deleteUserAppInfoById(userAppID: string): Promise<void> {
        const userApp = await this.prisma.user.findUnique({
            where: { id: userAppID },
        });

        if (!userApp) {
            throw new Error('User not found');
        }

        await this.prisma.user.delete({
            where: { id: userAppID },
        });

        return;
    }

}
