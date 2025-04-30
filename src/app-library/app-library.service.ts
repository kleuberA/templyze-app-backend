import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAppLibraryDto } from './dto/update-app-library-dto';

@Injectable()
export class AppLibraryService {
    constructor(private readonly prisma: PrismaService) { }

    async getAppsLibrary() {
        return this.prisma.app.findMany({});
    }

    async updateAppLibrary(appId: string, updateAppLibrary: UpdateAppLibraryDto) {

        const app = await this.prisma.app.findUnique({
            where: {
                id: appId,
            },
        });

        if (!app) {
            throw new Error("App not found");
        }

        return this.prisma.app.updateMany({
            where: {
                id: appId,
            },
            data: {
                ...updateAppLibrary
            },
        });
    }

    async deleteAppLibraryById(appId: string) {
        const app = await this.prisma.app.findUnique({
            where: {
                id: appId,
            },
        });

        if (!app) {
            throw new Error("App not found!");
        }

        return this.prisma.app.delete({
            where: {
                id: appId
            },
        });
    }

}
