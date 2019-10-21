import winston, { Logger } from 'winston'
import path from 'path'
import { container } from 'inversifyExpress/index'
import { clsHooked } from 'utils/hooked'

let logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: path.resolve(__dirname, '../../../logs/logger') }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss,SSS' }),
    winston.format.printf(info => {
      const { timestamp, level, message , ...data } = info 
      return `${timestamp} ${level} ${JSON.stringify(message, null, 2)} ${JSON.stringify(data, null, 2)}`
    })
  )
})

if (process.env.NODE_ENV === 'localdev') {
  logger = winston.createLogger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss,SSS' }),
      winston.format.printf(info => {
        let traceId
        try {
          traceId = clsHooked.get('traceId') || require('async_hooks').executionAsyncId()
        }catch(e) {
          traceId = require('async_hooks').executionAsyncId()
        }
        const { timestamp, level, message , ...data } = info 
        return `${timestamp} ${level} traceId=${traceId} ${JSON.stringify(message, null, 2)} ${JSON.stringify(data, null, 2)}`
      })
    )
  })
}

container.bind<Logger>('Logger').toConstantValue(logger)