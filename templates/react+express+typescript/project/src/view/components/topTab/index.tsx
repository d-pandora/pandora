import React from 'react'
import TopTab from './topTab'
import Tab from './tab'
import './index.less'

export default function () {
  return <TopTab renderItem={Tab} />
}
