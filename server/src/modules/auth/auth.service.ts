import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { GoogleClient } from './client/google.client';

@Injectable()
export class AuthService {
  constructor(
    private readonly googleClient: GoogleClient,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async googleLogin(code: string) {
    const accessToken = await this.googleClient.getToken(code);
    const userInfo = await this.googleClient.getUserInfo(accessToken);

    let user = await this.userService.findBySocialId(userInfo.socialId);
    if (!user) {
      user = await this.userService.create(userInfo);
    }

    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      name: user.name,
    };
    return this.jwtService.sign(payload);
  }

  private setTokenCookie(response: Response, token: string) {
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    const domain = this.configService.get('CORS_ORIGIN'); // 예: .yourdomain.com

    response.cookie('access_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax', // production에서는 'none'으로 설정
      domain: isProduction ? domain : undefined, // production에서만 domain 설정
      path: '/',
    });
  }
}
