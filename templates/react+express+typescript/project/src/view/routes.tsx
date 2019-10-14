import React from 'react'
import { Route } from 'react-router-dom'
import Container from './container'

import home from 'pages/home'
import about from 'pages/about'

const routes = (
  <Container>
    <Route exact path="/home" component={home} />
    <Route exact path="/about" component={about} />
  </Container>
)
export default routes
