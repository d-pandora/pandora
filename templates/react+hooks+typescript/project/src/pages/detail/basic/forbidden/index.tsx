import React from 'react'
import Icon from 'components/Icon'

import '../style.less'

export default function Forbidden (): JSX.Element {
  return (
    <div className="rider-forbidden">
      <Icon className="warning" type="warning" />
      禁用信息
      <a className="operate">查看全部3条</a>
    </div>
  )
}
