import React, { SFC } from 'react'
import { Layout } from 'antd'
import Menu from './menu'

import './style.less'

const { Sider, Header, Content } = Layout

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
        <Header className="layout-header">Header</Header>
        <Content style={{ padding: '8px 16px' }}>{props.children}</Content>
      </Layout>
    </Layout>
  )
}

export default PageLayout
