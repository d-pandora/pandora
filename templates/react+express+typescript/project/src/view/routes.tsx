import React from 'react'
import { Route } from 'react-router-dom'
import Layout from 'pages/layout'

import home from 'pages/home'
import about from 'pages/about'

const routes = (
  <Layout>
    <Route exact path="/home" component={home} />
    <Route exact path="/about" component={about} />
  </Layout>
)
export default routes
