import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class KakaoAuth {
  private readonly CLIENT_ID: string = 'ce184f45fd3d8708a1f657f25e58fe2f';
  private readonly REDIRECT_URI: string = 'http://localhost:3000/kakao/callback';
  private readonly CLIENT_SECRET: string = 'zTzlpS1hrGqjKWmmdPpZyPYmpaXmKP8x';
  constructor(private readonly configService: ConfigService) {}
  getAuthorizationUrl(): string {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&response_type=code`;
  }

  async getToken(code: string) {
    const response = await axios.post('https://kauth.kakao.com/oauth/token', null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        grant_type: 'authorization_code',
        client_id: this.CLIENT_ID,
        redirect_uri: this.REDIRECT_URI,
        client_secret: this.CLIENT_SECRET,
        code: code,
      },
    });

    return response.data;
  }

  async getUser(accessToken: string) {
    console.log(accessToken);
    const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }
}
