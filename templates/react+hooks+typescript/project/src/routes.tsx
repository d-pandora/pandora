import React, { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { Spin } from 'antd'
// import Layout from 'pages/layout'
import ErrorBoundary from 'utils/errorBoundary'
import UserList from 'pages/user/list/index'
import VirtaulTable from 'pages/virtualTable/index'
import RiderDetail from 'pages/detail/index'


const routes = (
  <div className="superman-rider">
    <ErrorBoundary>
      <Suspense fallback={<Spin className="layout-spinning" />}>
        <Route exact path="/user/list" component={UserList} />
        <Route exact path="/virtual/table" component={VirtaulTable} />
        <Route exact path="/rider/detail" component={RiderDetail} />
      </Suspense>
    </ErrorBoundary>
  </div>
)
export default routes
