import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import users from '../config/users';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    // check if the token is valid
    const {authorization, deviceToken, fingerPrint} = req.body;
    const user = users.find(user => user.deviceToken == deviceToken);
    
    if(user && user.authorization == authorization && user.fingerPrint == fingerPrint) {
        next();
    }else {
        throw new UnauthorizedException('Not Authorized', "Invalid Authentication");
    }
  }
}
