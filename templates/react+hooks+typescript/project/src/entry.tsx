import React from 'react'
import ReactDOM from 'react-dom'
import Root from './index'

function domElementGetter () {
  // Make sure there is a div for us to render into
  let el = document.getElementById('super-batman-rider')
  if (!el) {
    el = document.createElement('div')
    el.id = 'super-batman-rider'
    const root = document.getElementById('avengers-base')
    if (root) {
      root.appendChild(el)
    }
  }
  return el
}

export async function mount () {
  ReactDOM.render(<Root />, domElementGetter())
}

export async function unmount () {
  ReactDOM.unmountComponentAtNode(domElementGetter())
}
