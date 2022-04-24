import { loginPath } from './paths';
import { badRequest, notFound, serverError, unauthorized } from './components';
import { accountSchema, errorSchema, loginParamsSchema } from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node Api',
    description: 'Api created with clean architecture, solid and tdd',
    version: '1.0.0',
  },
  license: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT',
  },
  servers: [{ url: '/api' }],
  tags: [{ name: 'Login' }],
  paths: {
    '/login': loginPath,
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound,
  },
};
