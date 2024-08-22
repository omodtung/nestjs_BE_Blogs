
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
@Injectable()
export class RolesGuard implements CanActivate {
    constructor (private reflector : Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean  {
    console.log ( "vao RoleGuard")
    const requiredRole = this.reflector.getAllAndOverride<string[]>('roles',[
        context.getHandler(),
        context.getClass()
    ])
    if (!requiredRole)
    {
        return true;
    }
    console.log ( "requiredRoles",requiredRole)
    const {user} = context.switchToHttp().getRequest()
    console.log ("user = >",user)
    // return false ;
    return requiredRole.some (role =>user.roles.split(',').includes(role))
  }
}

