import React from 'react'
import { Row, Col, Button } from 'antd'
import Forbidden from './forbidden/index'
import BasicInfo from './basicInfo/index'
import Statistic from './statistic/index'
import Account from './account/index'
import Grade from './grade/index'
import Check from './check/index'
import Tag from './tag/index'
import Qualification from './qualification/index'
import Feature from './feature'
import './style.less'


export default function Basic (): JSX.Element {
  return (
    <div className="rider-basic">
      <Forbidden />
      <div className="content">
        <div className="left">
          <BasicInfo />
          <Row gutter={2}>
            <Col span={12}>
              <Statistic />
            </Col>
            <Col span={12}>
              <Account />
            </Col>
          </Row>
          <Grade />
        </div>
        <div className="right">
          <Check />
          <Tag />
          <Qualification />
          <Feature />
        </div>
      </div>
    </div>
  )
}
