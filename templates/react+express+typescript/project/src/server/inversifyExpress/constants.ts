const TYPE = {
  Controller: Symbol('Controller'),
}

const METADATA_KEY = {
  controller: '_controller',
  controllerMethod: '_controller-method',
  controllerParameter: '_controller-parameter',
  controllerBefore: '_controller-before',
  controllerAfter: '_controller-after',
}

export enum PARAMETER_TYPE {
  REQUEST,
  RESPONSE,
  PARAMS,
  QUERY,
  BODY,
  HEADERS,
  COOKIES,
  SESSION,
  NEXT,
  PARAMSFILTER,
}

const DEFAULT_ROUTING_ROOT_PATH = '/'

export { TYPE, METADATA_KEY, DEFAULT_ROUTING_ROOT_PATH }
