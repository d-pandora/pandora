import express from 'express'
import { interfaces, container } from 'inversifyExpress/index'
import { v4 } from 'uuid'
import { Logger } from 'winston'
import { clsHooked } from 'utils/hooked'

export default async function traceId(req: interfaces.Request, res: express.Response, next: express.NextFunction) {

  const logger = container.get<Logger>('Logger')
  const traceId = v4()
  req.traceId = traceId
  res.setHeader('trace-id', traceId)
  try {
    await clsHooked.runAndReturn(async () => {
      clsHooked.set('traceId', traceId)
      next()
    })
  } catch (e) {
    logger.error(`clsHooked error traceId=${traceId}, ${req.path}`)
    next()
  }
}
