import {NestInterceptor, ExecutionContext, CallHandler} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      })
    )
  }
}

