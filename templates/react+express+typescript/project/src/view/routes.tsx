import React from 'react'
import { Route } from 'react-router-dom'
import home from 'pages/about/index'
import about from 'pages/about/index'

const routes = (
  <div>
    <Route exact path="/home" component={home} />
    <Route exact path="/about" component={about} />
  </div>
)

export default routes
