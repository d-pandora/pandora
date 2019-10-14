import React from 'react'
import { Form as AntdForm, Row } from 'antd'
import { FormProps } from './interface'

import './style.less'

export const FormContext: React.Context<FormProps> = React.createContext({} as any)

function Form (props: FormProps): JSX.Element {

  return (
    <AntdForm className="form-wrapper">
      <FormContext.Provider value={props}>
        <Row gutter={16}>
          {props.children}
        </Row>
      </FormContext.Provider>
    </AntdForm>
  )
}


export default AntdForm.create<FormProps>({
  onFieldsChange (props, field) {
    const key = Object.keys(field)[0]
    const fields = props.formValue.fields || {}
    props.cacheFormValue({ [key]: field[key].value === undefined ? '' : field[key].value, fields: { ...fields, ...field }  })
  },
  mapPropsToFields (props) {
    const fields = props.formValue.fields || {}
    Object.keys(props.formValue).forEach((key: any) => {
      if (key === 'fields') {
        return
      }
      fields[key] = fields[key] ? AntdForm.createFormField({ ...fields[key], value: props.formValue[key] }) : AntdForm.createFormField({ value: props.formValue[key] })
    })
    return fields
  },
})(Form)
