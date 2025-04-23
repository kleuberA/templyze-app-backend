import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUser } from './dto/create-user-dto';
import { UserService } from './user.service';
import { Response } from 'express';

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

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

}
