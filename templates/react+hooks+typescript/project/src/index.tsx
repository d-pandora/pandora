import { render } from 'react-dom'
import React from 'react'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn'
import Router from './routes'
import './styles/base.less'
import './styles/index.less'

export default function Root () {
  return (
    <ConfigProvider locale={zhCN}>
      <HashRouter>{Router}</HashRouter>
    </ConfigProvider>
  )
}

render(<Root />, document.getElementById('root'))

if ((module as any).hot) {
  (module as any).hot.accept()
}
