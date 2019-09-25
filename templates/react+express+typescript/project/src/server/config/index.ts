import { container } from 'inversifyExpress/index'

export default class Config {
  public port = 3000
}

container.bind<Config>('Config').toConstantValue(new Config())
