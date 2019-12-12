import React from 'react'

import '../style.less'

export default function Check (): JSX.Element {
  return (
    <div className="rider-check panel">
      <div>
        <span className="title">证件审核</span>
        <a className="operate">查看证件</a>
      </div>
    </div>
  )
}
