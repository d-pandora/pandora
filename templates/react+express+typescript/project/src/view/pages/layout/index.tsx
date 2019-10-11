import React from 'react'
import { Layout } from 'antd'
import FormTemplate from 'compontents/form/template'

import './style.less'

const { Sider, Header, Content } = Layout

export default function PageLayout () {

  return (
    <Layout className="layout-container">
      <Sider>Sider</Sider>
      <Layout>
        <Header className="layout-header">Header</Header>
        <Content>Content</Content>
        <div style={{ width: "80%", margin: '30px auto'}}>
          <FormTemplate />
        </div>
      </Layout>
    </Layout>
  )
}
