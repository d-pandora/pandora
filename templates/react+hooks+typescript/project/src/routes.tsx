import React, { Suspense, lazy } from 'react'
import { Route } from 'react-router-dom'
import { Spin } from 'antd'
import Layout from 'pages/layout'
import ErrorBoundary from 'utils/errorBoundary'

const UserList = lazy(() => import('pages/user/list/index'))
const VirtaulTable = lazy(() => import('pages/virtualTable/index'))

const routes = (
  <Layout>
    <ErrorBoundary>
      <Suspense fallback={<Spin className="layout-spinning" />}>
        <Route exact path="/user/list" component={UserList} />
        <Route exact path="/virtual/table" component={VirtaulTable} />
      </Suspense>
    </ErrorBoundary>
  </Layout>
)
export default routes
