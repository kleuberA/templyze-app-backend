import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { IS_PUBLIC_KEY } from '../decorators/ispublic.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { UnauthorizedError } from '../errors/unauthorized.error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): Promise<boolean> | boolean {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const canActivate = super.canActivate(context);

        if (typeof canActivate === 'boolean') {
            return canActivate;
        }

        const canActivatePromise = canActivate as Promise<boolean>;

        return canActivatePromise.catch((error) => {
            if (error instanceof UnauthorizedError) {
                throw new UnauthorizedException(error.message);
            }

            throw new UnauthorizedException();
        });
    }
}