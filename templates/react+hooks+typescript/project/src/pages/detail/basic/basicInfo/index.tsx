import React from 'react'
import { Button } from 'antd'
import Measure from '../../components/measure/index'

import '../style.less'

export default function BasicInfo (): JSX.Element {
  return (
    <div className="rider-basicinfo panel">
      <div className="title">基础信息</div>
      <Measure>
        <Measure.Item label="UserName"><Button type="primary" onClick={() => console.log(1111)}>test</Button></Measure.Item>
        <Measure.Item label="Telephone">1810000000</Measure.Item>
        <Measure.Item label="Live">Hangzhou, Zhejiang</Measure.Item>
        <Measure.Item label="Remark">empty</Measure.Item>
        <Measure.Item label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Measure.Item>
      </Measure>
    </div>
  )
}
