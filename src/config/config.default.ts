import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export default class Config {
  swagger = true
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

  redis = []
}
