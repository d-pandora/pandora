import React, { Suspense, lazy } from 'react'
import { Route } from 'react-router-dom'
import Layout from 'pages/layout'
import ErrorBoundary from 'utils/errorBoundary'

const UserList = lazy(() => import('pages/user/list/index'))

const routes = (
  <Layout>
    <ErrorBoundary>
      <Suspense fallback={<div>loading</div>}>
        <Route exact path="/user/list" component={UserList} />
      </Suspense>
    </ErrorBoundary>
  </Layout>
)
export default routes
