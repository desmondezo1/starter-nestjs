import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { GetUser, Public } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { AuthDto, CreateUserDto } from './dto';
import { Tokens } from './types';
import { Success } from 'src/types';
import { SuccessReponse } from 'src/lib/success-response-handler';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() dto: CreateUserDto): Promise<Success> {
        const tokens: Tokens = await this.authService.signUp(dto);
        return SuccessReponse(HttpStatus.CREATED, 'User Created', tokens);
    }

    @Public()
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() dto: AuthDto): Promise<Success> {
        const tokens: Tokens = await this.authService.signIn(dto);
        return SuccessReponse(HttpStatus.OK, 'Access Granted', tokens);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@GetUser('_id') _id: string): Promise<Success> {
        await this.authService.logout(_id);
        return SuccessReponse(HttpStatus.OK, 'Logged Out');
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@GetUser('_id') _id: string, @GetUser('refreshToken') refreshToken: string): Promise<Success> {
        const tokens: Tokens = await this.authService.refreshToken(_id, refreshToken);
        return SuccessReponse(HttpStatus.OK, 'Tokens Refreshed', tokens);
    }
}
