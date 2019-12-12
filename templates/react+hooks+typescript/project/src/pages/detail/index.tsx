import React from 'react'
import AuthWrapper from 'components/authWrapper/index'

import Header from './header/index'
import Basic from './basic/index'

export default function RiderDetail () {
  return (
    <div className="rider-detail">
      <AuthWrapper authCode="ALLOW_ASSOCIATE_WORDS">
        <Header />
        <Basic />
      </AuthWrapper>
    </div>
  )
}
