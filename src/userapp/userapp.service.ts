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

    async updateUserAppInfoById(userID: string, userAppInfo: UserAppInfoByIdEntity): Promise<UserAppInfoByIdEntity> {
        const user = await this.prisma.user.findUnique({
            where: { id: userID },
        });

        if (!user) {
            throw new Error('User not found');
        }

        const updatedUser = await this.prisma.user.update({
            where: { id: userID },
            data: {
                ...userAppInfo,
                purchases: {
                    set: userAppInfo.purchases.map(purchase => ({
                        id: purchase.id,
                        createdAt: purchase.createdAt,
                        updatedAt: purchase.updatedAt,
                        userId: purchase.userId,
                        appId: purchase.appId,
                        customName: purchase.customName,
                    })),
                },
            },
            include: {
                purchases: true,
            },
        });

        return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
            purchases: updatedUser.purchases
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
