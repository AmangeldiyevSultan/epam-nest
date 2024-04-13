import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      request.error = { result: null, error: new UnauthorizedException('Token is missing') };
      return false;
    }

    const token = authHeader.replace(/^Bearer\s/, '');
    try {
      const user = this.jwtService.verify(token);
      request.user = user;
      return true;
    } catch (error) {
      request.error = { result: null, error: new UnauthorizedException('Unauthorized user') };
      return false;
    }
  }
}
