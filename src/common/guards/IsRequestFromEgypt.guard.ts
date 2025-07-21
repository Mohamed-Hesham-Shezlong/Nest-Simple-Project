import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import * as geoip from 'geoip-lite';

const EGYPT_CODE = 'EG' as const;

@Injectable()
export class IsRequestFromEgyptGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    // Get client IP address
    const ip =
      (request.headers['x-forwarded-for'] as string) ||
      request.socket.remoteAddress;

    // If no IP is found, block the request
    if (!ip) {
      throw new ForbiddenException('Could not determine client location');
    }

    // Look up location from IP
    const geo = geoip.lookup(ip);

    // If location cannot be determined, block the request
    if (!geo) {
      throw new ForbiddenException('Could not determine client location');
    }

    // Allow only Egyptian IPs
    if (geo.country !== EGYPT_CODE) {
      throw new ForbiddenException('Access is only allowed from Egypt');
    }

    return true;
  }
}
