import React, { SFC } from 'react'
import { Layout } from 'antd'
import Menu from './menu'

import './style.less'

const { Sider, Header, Content } = Layout

const menuData = [
  { name: 'Home', url: '/home', icon: '' },
  { name: 'About', url: '/about', icon: '' },
]

const PageLayout: SFC<{}> = function (props) {
  return (
    <Layout className="layout-container">
      <Sider>
        <Menu data={menuData} />
      </Sider>
      <Layout>
        <Header className="layout-header">Header</Header>
        <Content>{props.children}</Content>
      </Layout>
    </Layout>
  )
}

export default PageLayout
