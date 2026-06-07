import { BadRequestException, CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { Request } from 'express';
import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken';

@Injectable()
export class JtwGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
  const request: Request = context.switchToHttp().getRequest();
  const authHeader: string | undefined = request.headers.authorization;
    if(!authHeader) throw new BadRequestException('Falta el encabezado de autorizaacion')

    const [tipo, token] = authHeader.split(" ");
    
    if(tipo !== "Bearer" || !token) throw new BadRequestException("El formato de autorizacion del token debe ser Bearer");
    try{
      const tokenValidado = verify(token,  process.env.CLAVE_SECRETA!);
      const { email, perfil } = tokenValidado as {email: string, perfil: string}

      if(!request.body) {
        request.body = { email, perfil };
      } else {
        request.body.emailDelToken = email;
        request.body.perfil = perfil
      }
      return true;
    } catch(error){
      if(error instanceof TokenExpiredError) throw new UnauthorizedException('El token ha expirado');
      if(error instanceof JsonWebTokenError) throw new UnauthorizedException("Token invalido o fallo en la firma");
      
      throw new InternalServerErrorException("Error interno al verificar el token");
    
    }
  }
}
