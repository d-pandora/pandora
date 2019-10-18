import React from 'react'
import { Route } from 'react-router-dom'
import Layout from 'pages/layout'

import userList from 'pages/user/list/index'

const routes = (
  <Layout>
    <Route exact path="/user/list" component={userList} />
  </Layout>
)
export default routes
