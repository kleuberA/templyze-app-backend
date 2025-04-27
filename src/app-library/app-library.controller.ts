import { Controller, Get, HttpStatus, Put, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppLibraryService } from './app-library.service';
import { Response } from 'express';

@ApiTags('App Library')
@Controller('app-library')
export class AppLibraryController {
    constructor(private readonly appLibraryService: AppLibraryService) { }

    @ApiBearerAuth()
    @Get('/apps')
    async getAppsLibrary(@Res() resp: Response) {
        try {
            const apps = await this.appLibraryService.getAppsLibrary();
            return resp.status(HttpStatus.OK).json({ message: "Get list for apps!", data: apps });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to get apps!", error: error.message });
        }
    }

    @ApiBearerAuth()
    @Put('/update-app')
    async updateAppLibrary(@Res() resp: Response) {
        try {
            const apps = await this.appLibraryService.updateAppLibrary('1');
            return resp.status(HttpStatus.OK).json({ message: "Update app library!", data: apps });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to update app library!", error: error.message });
        }
    }

}
