import winston, { Logger, format } from 'winston'
import path from 'path'
import { container } from 'inversifyExpress/index';

let logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: path.resolve(__dirname, '../../../logs/logger') }),
  ]
});

if (process.env.NODE_ENV === 'localdev') {
  logger = winston.createLogger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      format.timestamp(),
      format.json()
    )
  });
}

container.bind<Logger>('Logger').toConstantValue(logger)