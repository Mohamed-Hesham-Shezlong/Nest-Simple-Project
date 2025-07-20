import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../entities/user.entity';
import { UserRole } from '../interfaces/user.role';

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    console.log('isAdmin', user.role);

    // Check if the user has the required role
    if (user && user.role === UserRole.ADMIN) {
      return true;
    }

    return false;
  }
}
