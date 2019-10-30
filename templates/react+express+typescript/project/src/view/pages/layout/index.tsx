import React, { SFC } from 'react'
import { Layout } from 'antd'
import TopTab from 'components/topTab'
import Menu from './menu'
import Header from './header'

import './style.less'

const { Sider, Content } = Layout

const menuData = [
  { name: 'Users', url: '/user/list', icon: '' },
  { name: 'About', url: '/about', icon: '' },
]

const PageLayout: SFC<{}> = function (props) {
  return (
    <Layout className="layout-container">
      <Sider>
        <Menu data={menuData} />
      </Sider>
      <Layout className="layout-content">
        <Header />
        <TopTab />
        <Content style={{ padding: '8px 16px' }}>{props.children}</Content>
      </Layout>
    </Layout>
  )
}

export default PageLayout
