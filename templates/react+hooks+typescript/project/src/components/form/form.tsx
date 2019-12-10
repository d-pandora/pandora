import React from 'react'
import { Form as AntdForm, Row } from 'antd'
import FormContext from './formContext'
import { FormProps } from './interface'

import './style.less'


function Form(props: FormProps): JSX.Element {
  return (
    <AntdForm className={`form-wrapper ${props.className}`}>
      <FormContext.Provider value={props}>
        <Row gutter={16}>
          {props.children}
        </Row>
      </FormContext.Provider>
    </AntdForm>
  )
}

export default AntdForm.create<FormProps>()(Form)
