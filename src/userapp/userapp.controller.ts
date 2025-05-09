import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Res } from '@nestjs/common';
import { UserappService } from './userapp.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserAppInfoByIdEntity } from './entity/userAppInfoById.entity';
@ApiTags('User App')
@Controller('userapp')
export class UserappController {
    constructor(private readonly userAppService: UserappService) { }

    @ApiBearerAuth()
    @Get('user-app/:id')
    async getUserInfoById(@Param('id') userID: string, @Res() resp: Response) {
        try {
            await this.userAppService.getUserInfoById(userID);
            return resp.status(HttpStatus.OK).json({ message: "Get info user app!" });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to get user app!", error: error.message });
        }
    }

    @ApiBearerAuth()
    @ApiBody({ type: UserAppInfoByIdEntity })
    @Patch('user-app/update/:id')
    async updateUserInfoById(@Param('id') userID: string, @Res() resp: Response, @Body() updateUserApp: UserAppInfoByIdEntity) {
        try {
            await this.userAppService.updateUserAppInfoById(userID, updateUserApp);
            return resp.status(HttpStatus.OK).json({ message: "Update user app!" });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to update user app!", error: error.message });
        }
    }

    @ApiBearerAuth()
    @Delete('user-app/delete/:id')
    async deleteUserInfoById(@Param('id') userID: string, @Res() resp: Response) {
        try {
            await this.userAppService.deleteUserAppInfoById(userID);
            return resp.status(HttpStatus.OK).json({ message: "Delete user app!" });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to delete user app!", error: error.message });
        }
    }

}
