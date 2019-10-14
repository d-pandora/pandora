import React from 'react'
import { Route } from 'react-router-dom'
import Layout from 'pages/layout'

import about from 'pages/about'
import userList from 'pages/user/list/index'

const routes = (
  <Layout>
    <Route exact path="/user/list" component={userList} />
    <Route exact path="/about" component={about} />
  </Layout>
)
export default routes
