import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import * as express from 'express'
import { AllExceptionsFilter } from './common/exception/all-exception.filter'
import config from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  //允许跨域
  // app.enableCors()
  // gzip压缩
  // app.use(compression())
  // For parsing application/json
  app.use(express.json())
  // For parsing application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }))
  // 速率限制
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 1000, // limit each IP to 100 requests per windowMs
  //   }),
  // )
  // 漏洞保护
  // app.use(helmet())

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  // 所有异常
  app.useGlobalFilters(new AllExceptionsFilter())
  // swagger文档
  if (config.swaggerPath) {
    const swaggerOptions = new DocumentBuilder()
      .setTitle('低代码服务')
      .setDescription(`[./${config.swaggerPath}-json](./${config.swaggerPath}-json)`)
      .setVersion('1.0')
      .addBearerAuth({ in: 'header', type: 'http' })
      .build()
    const document = SwaggerModule.createDocument(app, swaggerOptions)
    SwaggerModule.setup(config.swaggerPath, app, document)
    Logger.log(config.swaggerPath, 'swagger启动成功')
  }
  await app.listen(config.port)
  Logger.log(`http://localhost:${config.port}/${config.swaggerPath}`, '服务启动成功')
  Logger.log(config.env, '当前启动环境')
}
bootstrap()
