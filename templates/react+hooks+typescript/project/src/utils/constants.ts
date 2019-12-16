// 项目的token name 每个项目不同，最好自己根据项目名改下
export const PROJECT_TOKERN_NAME = 'project_token_name'
export const OPEN_TOPTAB_EVENT = 'open_top_tab_event'
// 菜单列表
export const menuList = [
  { name: 'Users', url: '/user/list', icon: '' },
  { name: 'RiderDetail', url: '/rider/detail', icon: '' },
  { name: 'VirtualTable', url: '/virtual/table', icon: '' },
]


let BATMAN_URL = 'http://127.0.0.1:4000'

switch (window.location.hostname) {
  // batman
  case 'hawkeyenew.dianwoda.com':
  case 'batman.dianwoda.cn':
    BATMAN_URL = 'http://batman-gateway-new.dianwoda.com'
    break
  // batman1
  case 'pre-hawkeyenew.dianwoda.com':
  case 'batman1.dianwoda.cn':
    BATMAN_URL = 'http://pre-batman-gateway-new.dianwoda.com'
    break
  // aliyunqa1
  case 'batman.qa1-in.dwbops.com':
  case 'batmanboot-gw-qa1.dwbops.com':
    BATMAN_URL = 'http://batman-gateway-qa1.dwbops.com'
    break
  // qa3
  case 'batman-qa3-in.dwbops.com':
  case 'batmanboot-gw-qa3.dwbops.com':
    BATMAN_URL = 'http://batman-gateway-qa3.dwbops.com'
    break
  // 本地开发
  case '127.0.0.1':
  case 'localhost':
    BATMAN_URL = 'http://127.0.0.1:4000'
    break
  // 其他，默认都连开发环境
  default:
    BATMAN_URL = 'http://batman-gateway-gw-dev-gw.dwbops.com'
    break
}

/* 基准环境 */
// http://batman-gateway-gw-qa1.dwbops.com
// http://batmanboot-gw-qa1.dwbops.com
/* 临时环境 */
// http://batmanboot-btm-gw-qa1-gw-105.dwbops.com
// http://batman-gateway-btm-gw-qa1-gw-105.dwbops.com
/* 目前测试环境临时环境逻辑 */
const { hostname } = window.location
const testEnvs = ['-qa-', '-qa1-', '-qa2-', '-qa3-']
const envIndex = testEnvs.findIndex((env) => hostname.indexOf(env) > -1)
if (envIndex !== -1) {
  const zone = '-gw-'
  const suffix = '.dwbops'
  const zoneIndex = hostname.search(zone)
  /* 临时环境 */
  if (zoneIndex !== -1) {
    const suffixIndex = hostname.search(suffix)
    const namespace = hostname.slice(zoneIndex + zone.length, suffixIndex)
    // prefix = `app` + '-' + `service-chain`
    const gatewayPrefix = hostname.split(zone)[0].replace('new-hawkeye', 'batman-gateway')
    BATMAN_URL = `http://${gatewayPrefix}${zone}${namespace}${suffix}.com`
  }
}
export const API_BATMAN = BATMAN_URL
