import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export default class Config {
  env = process.env.SERVER_ENV
  port = process.env.PORT || 3000
  swaggerPath = 'swagger'
  passwordSecret = 'race'

  mysql: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'race_nestjs_admin',
    port: 3306,
    // charser: 'utf8mb4',
    logger: 'advanced-console',
    logging: true,
    multipleStatements: true,
    dropSchema: false,
    synchronize: false,
    bigNumberStrings: false,
    timezone: 'local',
  }

  redis = [
    {
      name: 'auth',
      host: 'localhost',
      port: 6379,
      db: 0,
    },
    {
      name: 'admin',
      host: 'localhost',
      port: 6379,
      db: 1,
    },
    {
      name: 'app',
      port: 6379,
      db: 2,
    },
  ]

  jwt = {
    secretkey: 'zANDwNQVFzxlfG9myPxVWAkq4iXJEPhI',
    expiresin: '12h',
    refreshExpiresIn: '24h',
  }
  permissions = {
    close: true,
  }
}
