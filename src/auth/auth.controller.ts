import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Response, } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/ispublic.decorator';
import { LoginRequestBody } from './dto/LoginRequestBody-dto';
import { AuthRequest } from './dto/AuthRequest-dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @ApiBody({ type: LoginRequestBody })
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: AuthRequest, @Response() res) {
        const access_token = await this.authService.login(req.user);
        res.cookie('accessToken', access_token, {
            expires: new Date(new Date().getTime() + 30 * 1000),
            sameSite: 'strict',
            httpOnly: true,
        });
        return res.json(access_token);
    }
}
