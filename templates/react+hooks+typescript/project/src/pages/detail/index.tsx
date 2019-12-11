import React from 'react'

import Header from './header/index'
import Basic from './basic/index'

export default function RiderDetail () {
  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column', background: '#F2F2F2' }}>
      <Header />
      <Basic />
    </div>
  )
}
