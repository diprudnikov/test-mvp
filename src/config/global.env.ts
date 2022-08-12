import { IStorageRbac } from 'nestjs-rbac';

export const APP = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  APIDOC_URL: process.env.APIDOC_URL,
  API_VERSION: process.env.API_VERSION,
};

export const JWT_AUTH = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  PASSPORT_STRATEGY: process.env.PASSPORT_STRATEGY || 'jwt',
};

export const RBAC: IStorageRbac = {
  roles: ['buyer', 'seller', 'admin'],
  permissions: {
    product: ['update', 'read', 'create', 'delete'],
    user: ['update', 'read', 'create', 'delete', 'deposit', 'buy', 'reset']
  },
  grants: {
    buyer: [
      'product@read',
      'user@deposit',
      'user@buy',
      'user@reset'
    ],
    seller: [
      'product',
      'user@read'
    ],
    admin: [
      'product',
      'user'
    ]
  },
  filters: {},
};
