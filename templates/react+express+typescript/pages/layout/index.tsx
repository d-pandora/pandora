import React from 'react'
import { Layout } from 'antd'

import './style.less'

const { Sider, Header, Content, Footer } = Layout

export default function PageLayout () {
  return (
    <Layout className="layout-container">
      <Sider>Sider</Sider>
      <Layout>
        <Header className="layout-header">Header</Header>
        <Content>Content</Content>
      </Layout>
    </Layout>
  )
}
