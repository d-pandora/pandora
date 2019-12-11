import React, { forwardRef, useImperativeHandle } from 'react'
import { Form as AntdForm, Row } from 'antd'
import FormContext from './formContext'
import { FormProps, ValidateCallback } from './interface'

import './style.less'

export interface FormHandles {
  setFormValue(value: FormProps['formValue']): void;
  getFormValue(): FormProps['formValue'];
  validate(callback: ValidateCallback<FormProps['formValue']>): void;
  clear(): void;
}

function Form (props: FormProps, ref?: React.Ref<FormHandles>): JSX.Element {
  function setFormValue (value: FormProps['formValue']) {
    props.form.setFieldsValue(value)
  }

  function getFormValue () {
    return props.form.getFieldsValue()
  }

  useImperativeHandle(ref, () => ({
    setFormValue,
    getFormValue,
    validate: props.form.validateFields,
    clear: props.form.resetFields,
  }))

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

export default AntdForm.create<FormProps>()(forwardRef(Form))
