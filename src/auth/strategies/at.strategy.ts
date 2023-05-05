import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from 'dotenv';
import { Injectable } from "@nestjs/common";

dotenv.config();

type JwtPayload = {
    _id: string,
    email: string
}

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.AT_SECRET
        });
    }

    validate(payload: JwtPayload) {
        return payload;
    }
}