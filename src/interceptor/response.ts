import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResponseDto } from '../helpers/response';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        // const response = context.switchToHttp().getResponse();

        if (data && data.code) {
          return data;  // 如果已经是统一的 Response 格式
        }

        // 如果返回的结果是 null 或 undefined，封装为错误响应
        if (data === null || data === undefined) {
          return ResponseDto.error({
            message: "error",
            code: 500,
          });
        }

        return ResponseDto.success({
          message: "success",
          data: data || null,
        });
      })
    );
  }
}
