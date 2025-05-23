import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Put, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AppLibraryService } from './app-library.service';
import { Response } from 'express';
import { UpdateAppLibraryDto } from './dto/update-app-library-dto';

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
    @Get('/app/:id')
    async getAppLibraryById(@Res() resp: Response, @Param('id') appId: string) {
        try {
            const app = await this.appLibraryService.getAppLibraryById(appId);
            return resp.status(HttpStatus.OK).json({ message: "Get app library!", data: app });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to get app library!", error: error.message });
        }
    }

    @ApiBearerAuth()
    @ApiBody({ type: UpdateAppLibraryDto })
    @Patch('/update-app/:id')
    async updateAppLibrary(@Res() resp: Response, @Param('id') appId: string, @Body() updateAppLibrary: UpdateAppLibraryDto) {
        try {
            const apps = await this.appLibraryService.updateAppLibrary(appId, updateAppLibrary);
            return resp.status(HttpStatus.OK).json({ message: "Update app library!", data: apps });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to update app library!", error: error.message });
        }
    }

    @ApiBearerAuth()
    @Delete('/delete-app/:id')
    async deleteAppLibraryById(@Res() resp: Response, @Param('id') appId: string) {
        try {
            const app = await this.appLibraryService.deleteAppLibraryById(appId);
            return resp.status(HttpStatus.OK).json({ message: "Delete app library!", data: app });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to delete app library!", error: error.message });
        }
    }

}
