import { JwtModuleOptions } from '@nestjs/jwt';

const { JWT_SECRET } = process.env;

export const jwtConfig: JwtModuleOptions = {
  global: true,
  secret: JWT_SECRET,
  signOptions: { expiresIn: "1d" },
};