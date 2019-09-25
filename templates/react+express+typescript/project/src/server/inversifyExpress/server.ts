import express from 'express'
import inversify from "inversify";
import { interfaces } from './interfaces'
import { container, buildProviderModule } from './ioc'
import { TYPE, METADATA_KEY, PARAMETER_TYPE } from './constants'

export default class InversifyExpressServer {
  private _container: inversify.interfaces.Container
  private _router: express.Router
  private _app: express.Application

  constructor (
    customApp?: express.Application,
  ) {
    this._container = container
    this._router = express.Router()
    this._app = customApp || express()
  }

  public build (): express.Application {
    this._container.load(buildProviderModule());
    this.registerControllers()
    return this._app
  }

  private registerControllers () {
    const controllers: interfaces.Controller[] = this._container.getAll<interfaces.Controller>(TYPE.Controller)
    controllers.forEach((controller: interfaces.Controller) => {
      const controllerMetadata: interfaces.ControllerMetadata = Reflect.getMetadata(METADATA_KEY.controller, controller.constructor)
      const methodMetadata: interfaces.ControllerMethodMetadata[] = Reflect.getMetadata(METADATA_KEY.controllerMethod, controller.constructor)
      const parameterMetadata: interfaces.ControllerParameterMetadata = Reflect.getMetadata(METADATA_KEY.controllerParameter, controller.constructor)

      if (controllerMetadata && methodMetadata) {
        methodMetadata.forEach((metadata: interfaces.ControllerMethodMetadata) => {
          let paramList: interfaces.ParameterMetadata[] = []
          if (parameterMetadata) {
            paramList = parameterMetadata[metadata.methodName] || []
          }
          const handler: express.RequestHandler = this.handlerFactory(controller.constructor.name, metadata.methodName, paramList)
          this._router[metadata.method](
            `${controllerMetadata.path}${metadata.path}`,
            ...controllerMetadata.middleWares,
            ...metadata.middleWares,
            handler,
          )
        })
      }
    })
    this._app.use(this._router)
  }

  private handlerFactory(controllerName: string, methodName: string, parameterMetadata: interfaces.ParameterMetadata[]): express.RequestHandler {
    return async (req, res, next) => {
      const controller: any = this._container.getNamed(TYPE.Controller, controllerName)

      const controllerBeforeMetadata: interfaces.BeforeMetadata = Reflect.getOwnMetadata(
        METADATA_KEY.controllerBefore,
        controller.constructor,
        methodName,
      )

      const controllerAfterMetadata: interfaces.AfterMetadata = Reflect.getOwnMetadata(
        METADATA_KEY.controllerAfter,
        controller.constructor,
        methodName,
      )

      const method = controller[methodName].bind(controller)
      let args = this.extractParameters(req, res, next, parameterMetadata)
      if (controllerBeforeMetadata) {
        args = await controllerBeforeMetadata(args, req, res, next)
      }
      let result = await method(...args)
      if (controllerAfterMetadata) {
        result = await controllerAfterMetadata(result, req, res, next)
      }
      if (result && !result.headersSent) {
        res.send(result)
      }
    }
  }

  private extractParameters(req: express.Request, res: express.Response, next: express.RequestHandler, params: interfaces.ParameterMetadata[]) {
    const args = []
    if (!params || !params.length) {
      return [req, res, next]
    }
    for (const item of params) {
      switch (item.type) {
        case PARAMETER_TYPE.RESPONSE: args[item.index] = res; break
        case PARAMETER_TYPE.REQUEST: args[item.index] = item.parameterName && item.parameterName !== 'default' ? this.getParam(req, null, item.parameterName) : req; break
        case PARAMETER_TYPE.NEXT: args[item.index] = next; break
        case PARAMETER_TYPE.PARAMS: args[item.index] = this.getParam(req, 'params', item.parameterName); break
        case PARAMETER_TYPE.QUERY: args[item.index] = item.parameterName && item.parameterName !== 'default' ? this.getParam(req, 'query', item.parameterName) : req.query; break
        case PARAMETER_TYPE.BODY: args[item.index] = item.parameterName && item.parameterName !== 'default' ? this.getParam(req, 'body', item.parameterName) : req.body; break
        case PARAMETER_TYPE.HEADERS: args[item.index] = this.getParam(req, 'headers', item.parameterName); break
        case PARAMETER_TYPE.COOKIES: args[item.index] = item.parameterName && item.parameterName !== 'default' ? req.cookies[item.parameterName] : req.cookies; break
        // case PARAMETER_TYPE.SESSION: args[item.index] = item.parameterName && item.parameterName !== 'default' ? req.session[item.parameterName] : req.session; break
        default:
          args[item.index] = res; break
      }
    }
    args.push(req, res, next)
    return args
  }

  private getParam (source: any, paramType: string | null, name: string) {
    const param = paramType && source[paramType] ? source[paramType] : source 
    return param[name]
  }

}