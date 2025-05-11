import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUser } from './dto/create-user-dto';
import { UserService } from './user.service';
import { Response } from 'express';

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @ApiBearerAuth()
    @Get("/users")
    async getAllUsers(@Res() resp: Response) {
        try {
            const users = await this.userService.getUsers();
            return resp.status(HttpStatus.OK).json({ message: "Users fetched successfully!", users });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to fetch users!", error: error.message });
        }
    }

    @IsPublic()
    @ApiBody({ type: CreateUser })
    @Post("create")
    async createUser(@Body() createUser: CreateUser, @Res() resp: Response) {
        try {
            await this.userService.createUser(createUser);
            return resp.status(HttpStatus.OK).json({ message: "User created successfully!" });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to create user!", error: error.message });
        }
    }

    @ApiBearerAuth()
    @Delete("/user/delete/:id")
    async deleteUser(@Param('id') userID: string, @Res() resp: Response) {
        try {
            await this.userService.deleteUser(userID);
            return resp.status(HttpStatus.OK).json({ message: "User deleted successfully!" });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to delete user!", error: error.message });
        }
    }

}
