import React from 'react'
import { Form, Row, Col, Button } from 'antd'
import moment from 'moment'
import { cloneDeep } from 'lodash'
import FormContext from './formContext'
import { InputItem, SelectItem, RangePickerItem, DatePickerItem, UserSelectItem } from './index'
import { SearchFormProps, IFormColumnValue } from './interface'
import './style.less'

function SearchForm (props: SearchFormProps): JSX.Element {
  const labelCol = 10
  const wrapperCol = 14

  function getText (item: any) {
    return (
      <InputItem
        id={item.id}
        labelCol={item.labelCol || labelCol}
        wrapperCol={item.wrapperCol || wrapperCol}
        formItemLabel={item.formItemLabel}
        rules={item.rules}
        onChange={item.onChange}
      />
    )
  }

  function getSelect (item: any) {
    return (
      <SelectItem
        id={item.id}
        labelCol={item.labelCol || labelCol}
        wrapperCol={item.wrapperCol || wrapperCol}
        formItemLabel={item.formItemLabel}
        rules={item.rules}
        mode={item.mode}
        options={item.options || []}
        allowClear={item.allowClear}
        optionValueKey={item.optionValueKey}
        optionLabelKey={item.optionLabelKey}
        optionPinyinKey={item.optionPinyinKey}
        onSearch={item.onSearch}
        onChange={item.onChange}
        dropdownMatchSelectWidth={item.dropdownMatchSelectWidth}
      />
    )
  }

  function getDatePicker (item: any) {
    return (
      <DatePickerItem
        format={item.format}
        id={item.id}
        labelCol={item.labelCol || labelCol}
        wrapperCol={item.wrapperCol || wrapperCol}
        formItemLabel={item.formItemLabel}
        rules={item.rules}
        showTime={item.showTime}
      />
    )
  }

  function getRangePicker (item: any) {
    return (
      <RangePickerItem
        format={item.format}
        showTime={item.showTime}
        id={item.id}
        labelCol={item.labelCol || 5}
        wrapperCol={item.wrapperCol || 19}
        formItemLabel={item.formItemLabel}
        rules={item.rules}
        placeholder={item.placeholder}
      />
    )
  }

  function getUserSearch (item: any) {
    return (
      <UserSelectItem
        id={item.id}
        type={item.searchType}
        labelCol={item.labelCol || labelCol}
        wrapperCol={item.wrapperCol || wrapperCol}
        formItemLabel={item.formItemLabel}
        rules={item.rules}
      />
    )
  }

  function renderFormItem (item: IFormColumnValue) {
    switch (item.type) {
      case 'userSearch': return getUserSearch(item)
      case 'datePicker': return getDatePicker(item)
      case 'select': return getSelect(item)
      case 'rangePicker': return getRangePicker(item)
      case 'text': return getText(item)
      default: return getText(item)
    }
  }

  function onSearch () {
    props.onSearch()
  }

  function handleClear () {
    props.onClear && props.onClear()
  }

  return (
    <Form className={`form-wrapper ${props.className}`}>
      <FormContext.Provider value={props as any}>
        <Row gutter={16}>
          {props.formColumns.map((item, key) => (
            <Col md={item.span || 24} sm={24} key={`key-${key + 1}`} style={{ padding: 0 }}>{renderFormItem(item)}</Col>
          ))}
          <span className="pull-right">
            { props.onClear ? <Button className="mr10" onClick={handleClear}>清空</Button> : null}
            <Button className="mr10" type="primary" onClick={onSearch}>搜索</Button>
          </span>
        </Row>
      </FormContext.Provider>
    </Form>
  )
}

export default Form.create<SearchFormProps>({
  onFieldsChange (props, field) {
    const key = Object.keys(field)[0]
    const fields = props.formValue.fields || {}
    const keysValue: any = {}
    if (key.split(',').length > 1) {
      const keys = key.split(',')
      for (let i = 0; i < keys.length; i++) {
        if (moment.isMoment(field[key].value[i])) {
          // eslint-disable-next-line
          keysValue[keys[i]] = field[key].value[i]._d
        } else {
          keysValue[keys[i]] = field[key].value[i]
        }
      }
      props.formFieldChange({ ...keysValue, fields: { ...fields, ...field } })
    } else {
      props.formFieldChange({ [key]: field[key].value || '', fields: { ...fields, ...field } })
    }
  },
  mapPropsToFields (props) {
    const fields = cloneDeep(props.formValue.fields || {})
    props.formColumns.map((item: any) => {
      if (Array.isArray(item.id)) {
        if (item.type === 'rangePicker') {
          const fieldValue = props.formValue[item.id[0]] && props.formValue[item.id[0]] ? [moment(props.formValue[item.id[0]]), moment(props.formValue[item.id[1]])] : []
          fields[item.id.toString()] = fields[item.id] ? Form.createFormField({ ...fields[item.id.toString()], value: fieldValue }) : Form.createFormField({ value: fieldValue })
        }
      } else {
        fields[item.id] = fields[item.id] ? Form.createFormField({ ...fields[item.id], value: props.formValue[item.id] }) : Form.createFormField({ value: props.formValue[item.id] })
      }
      return true
    })
    return fields
  },
})(SearchForm)
