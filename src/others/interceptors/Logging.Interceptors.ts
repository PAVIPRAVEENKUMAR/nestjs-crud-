import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const startTime = Date.now();

    console.log(`Incoming request: ${method} ${url}`);

    return next
      .handle()
      .pipe(
        tap(() => console.log(`Response sent in ${Date.now() - startTime}ms`)),
        map(data => {
          if (data && data.password) {
            delete data.password;
          }
          if (data && data.salt) {
            delete data.salt;
          }
          return data;
        })
      );
  }
}