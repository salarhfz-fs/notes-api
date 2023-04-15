import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {UsersService} from "src/users/users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const userId = request.session.userId;
    if (userId) {
      const user = await this.usersService.findOne(userId);
      request.user = user;
    }
    return next.handle();
  }
}

