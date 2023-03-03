import Config from './config.default'

let TargetConfig = Config

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  TargetConfig = require(`./config.${process.env.SERVER_ENV}`).default as typeof Config
  console.log(`当前读取的环境配置为  ${process.env.SERVER_ENV}`)
} catch (e: any) {
  console.log('未获取到相对应的环境配置文件，使用默认配置')
}

const config = new TargetConfig()
export default config
