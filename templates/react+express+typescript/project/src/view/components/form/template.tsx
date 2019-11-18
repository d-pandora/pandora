import React, { useState } from 'react'
import moment from 'moment'
import Form, {
  InputItem,
  InputNumberItem,
  SelectItem,
  CheckboxItem,
  RadioItem,
  TreeSelectItem,
  DatePickerItem,
  RangePickerItem,
} from 'components/form/index'

export default function FormTemplate() {
  const [state, setState] = useState({
    inputItem: '123456',
    selectItem: '2',
    treeSelectItem: ['0-0-2'],
    rangePickerItem: [moment(), moment()],
  })

  function formFieldChange(value: any) {
    setState({
      ...state,
      ...value,
    })
  }

  const treeData = [
    {
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [
        {
          title: 'Child Node1',
          value: '0-0-1',
          key: '0-0-1',
        },
        {
          title: 'Child Node2',
          value: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
    },
  ]

  return (
    <Form
      formValue={state}
      formFieldChange={formFieldChange}
    >
      <InputItem
        span={6}
        rules={[{ required: true }]}
        id="inputItem"
        formItemLabel="InputItem"
      />
      <InputNumberItem
        span={6}
        rules={[{ required: true }]}
        id="inputNumberItem"
        formItemLabel="InputNumberItem"
      />
      <SelectItem
        span={6}
        id="selectItem"
        rules={[{ required: true }]}
        optionValueKey="code"
        optionLabelKey="mean"
        options={[{ code: 1, mean: 'a' }, { code: 2, mean: 'b' }]}
        formItemLabel="SelectItem"
      />
      <RadioItem
        span={6}
        id="radioItem"
        rules={[{ required: true }]}
        optionValueKey="code"
        optionLabelKey="mean"
        options={[{ code: 1, mean: 'a' }, { code: 2, mean: 'b' }]}
        formItemLabel="RadioItem"
      />
      <CheckboxItem
        span={6}
        id="checkboxItem"
        formItemLabel="RadioItem"
      />
      <TreeSelectItem
        span={6}
        id="treeSelectItem"
        treeData={treeData}
        formItemLabel="TreeSelectItem"
      />
      <DatePickerItem
        span={6}
        id="datePickerItem"
        formItemLabel="DatePickerItem"
      />
      <RangePickerItem
        span={12}
        id="rangePickerItem"
        formItemLabel="RatePickerItem"
        showTime
        labelCol={5}
        wrapperCol={14}
      />
    </Form>
  )
}
