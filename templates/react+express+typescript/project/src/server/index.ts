import 'module-alias/register'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import { InversifyExpressServer, container } from 'inversifyExpress/index'
import 'utils/loader'

import accessLogger from 'middlewares/logger'
import html from 'middlewares/html'
import Config from 'config/index'

const config = container.get<Config>('Config')

const app = express()

app.use(cookieParser())
app.use(bodyParser())
app.use(cors())

app.use(express.static(path.resolve(__dirname, '/static')))

app.use(accessLogger)

let server = new InversifyExpressServer(app)

let serverInstance = server.build()

app.use(html)

serverInstance.listen(config.port)

console.log(`Server started on port ${config.port} :)`)