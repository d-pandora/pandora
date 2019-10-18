import React, { Suspense, lazy } from 'react'
import { Route } from 'react-router-dom'
import Layout from 'pages/layout'
import ErrorBoundary from './errorBoundary'

const About = lazy(() => import('pages/about'))
const UserList = lazy(() => import('pages/user/list/index'))

const routes = (
  <Layout>
    <ErrorBoundary>
      <Suspense fallback={<div>loading</div>}>
        <Route exact path="/user/list" component={UserList} />
        <Route exact path="/about" component={About} />
      </Suspense>
    </ErrorBoundary>
  </Layout>
)
export default routes
