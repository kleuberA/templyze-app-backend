import { User } from 'src/user/entity/user.entity';
import { Request } from 'express';


export interface AuthRequest extends Request {
    user: User;
}