import React from 'react'

import '../style.less'

export default function Tag (): JSX.Element {
  return (
    <div className="rider-tag panel">
      <div>
        <span className="title">标签<span className="count">(18)</span></span>
        <a className="operate">添加</a>
      </div>
    </div>
  )
}
