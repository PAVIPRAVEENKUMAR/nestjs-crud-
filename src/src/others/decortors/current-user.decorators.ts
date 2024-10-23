import {
    createParamDecorator,
    ExecutionContext,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { decode, verify } from 'jsonwebtoken';
  import { HEADER_NAME } from 'src/others/constants';
  import { JwtPayload } from 'src/auth/jwt.payload';
  
  export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest();
      const jwt = request.headers[HEADER_NAME]?.split(' ')[1];
      if (!jwt) throw new HttpException('Token missing', HttpStatus.UNAUTHORIZED);
      const user = verify(jwt, process.env.JWT_SECRET, {}) as JwtPayload;
      return user;
    },
  );