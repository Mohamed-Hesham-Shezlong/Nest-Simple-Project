import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method;
    const url = request.url;
    const controller = context.getClass().name;
    const handler = context.getHandler().name; // Handler is the method that handles the request
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const elapsedTime = Date.now() - now;
        this.logger.log(
          `${method} ${url} [${controller}.${handler}] - ${elapsedTime}ms`,
        );
      }),
    );
  }
}
