import { render } from 'react-dom'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import PageLayout from 'pages/layout/index'


render(<PageLayout />, document.getElementById('root'))

if ((module as any).hot) {
  (module as any).hot.accept()
}
