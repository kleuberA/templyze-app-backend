import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppLibraryService {
    constructor(private readonly prisma: PrismaService) { }

    async getAppsLibrary() {
        return this.prisma.app.findMany({});
    }

}
