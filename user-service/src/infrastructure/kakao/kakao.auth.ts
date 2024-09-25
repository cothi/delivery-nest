import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class KakaoAuth {
  constructor(private readonly configService: ConfigService) {}

  getAuthorizationUrl(): string {
    return `https://kauth.kakao.com/oauth/authorize?cliend_id=`;
  }

  async getToken(code: string) {
    const response = await axios.post('https://kauth.kakao.com/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: this.CLIENT_ID,
        redirect_uri: this.REDIRECT_URI,
        code,
      },
    });

    return response.data;
  }

  async getUser(accessToken: string): Promise<string> {
    const response = await axios.get('http://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data;
  }
}
