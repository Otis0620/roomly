import { Container } from 'inversify';

import { HttpClient } from '@/core/api/HttpClient';
import type { IHttpClient } from '@/core/api/IHttpClient';
import { AuthApi } from '@/features/auth/api/AuthApi';
import { AuthService } from '@/features/auth/services/AuthService';
import { getAccessToken } from '@/features/auth/utils/accessToken';

import { IDENTIFIERS } from './identifiers';

const container = new Container();

container
  .bind<IHttpClient>(IDENTIFIERS.HttpClient)
  .toDynamicValue((): IHttpClient => {
    return new HttpClient(getAccessToken);
  })
  .inSingletonScope();
container.bind<AuthApi>(IDENTIFIERS.AuthApi).to(AuthApi).inSingletonScope();
container.bind<AuthService>(IDENTIFIERS.AuthService).to(AuthService).inSingletonScope();

export { container };
