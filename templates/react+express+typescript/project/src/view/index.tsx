import { render } from 'react-dom'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes'
import './styles/base.less'
import './styles/index.less'

render(
  <BrowserRouter>{Router}</BrowserRouter>,
  document.getElementById('root'),
)

if ((module as any).hot) {
  (module as any).hot.accept()
}
