import { BadRequestException, CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { Request } from 'express';
import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const request: Request = context.switchToHttp().getRequest();
    let token: string | undefined;

    const authHeader: string | undefined = request.headers.authorization;

    if(authHeader) {
      const [tipo, tokenHeader] = authHeader.split(" ");
      if(tipo === "Bearer" && tokenHeader){
        token = tokenHeader;
      } else {
        throw new BadRequestException("El formato de autorizacion del token debe ser Bearer");
      } 
    } else if (request.cookies && request.cookies["Authorization"]) {
      token = request.cookies["Authorization"];
    }
  
    if(!token) throw new BadRequestException('Falta el encabezado de autorizaacion o la cookie de la sesion');
    
    try{
      const tokenValidado = verify(token,  process.env.CLAVE_SECRETA!);
      const { email, perfil } = tokenValidado as {email: string, perfil: string}

      request["usuario"] = {email, perfil}
      return true;
    } catch(error){
      if(error instanceof TokenExpiredError) throw new UnauthorizedException('El token ha expirado');
      if(error instanceof JsonWebTokenError) throw new UnauthorizedException("Token invalido o fallo en la firma");
      
      throw new InternalServerErrorException("Error interno al verificar el token");
    
    }
  }
}
