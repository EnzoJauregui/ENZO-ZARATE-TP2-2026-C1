import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request["usuario"]
    if( !user){
      throw new BadRequestException("No hay usuario");
    }
    if( user.perfil !== "administrador") throw new BadRequestException("No es administrador");
    return true;
  }
}
