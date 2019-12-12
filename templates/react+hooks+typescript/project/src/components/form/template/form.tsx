import React, { useRef } from 'react'
import { Button } from 'antd'
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
  FormHandles,
} from 'components/form/index'

export default function FormTamplate () {
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

  const formRef = useRef<FormHandles>(null)

  function handleSetFormValue () {
    formRef.current?.setFormValue({
      inputItem: 1,
      inputNumberItem: 1,
      selectItem: 2,
      radioItem: 2,
      checkboxItem: true,
      treeSelectItem: '0-1',
      datePickerItem: moment(),
      rangePickerItem: [moment(), moment()],
    })
  }

  function handleClearFormValue () {
    formRef.current?.clear()
  }

  function handleValidateFormValue () {
    formRef.current?.validate((err: Error, values: any) => {
      if (!err) {
        console.log('....', err, values)
      }
    })
  }


  return (
    <Form wrappedComponentRef={formRef}>
      <InputItem
        rules={[{ required: true }]}
        id="inputItem"
        formItemLabel="InputItem"
        labelCol={7}
      />
      <InputNumberItem
        rules={[{ required: true }]}
        id="inputNumberItem"
        formItemLabel="InputNumberItem"
        labelCol={7}
      />
      <SelectItem
        id="selectItem"
        rules={[{ required: true }]}
        optionValueKey="code"
        optionLabelKey="mean"
        options={[{ code: 1, mean: 'a' }, { code: 2, mean: 'b' }]}
        formItemLabel="SelectItem"
        labelCol={7}
      />
      <RadioItem
        id="radioItem"
        rules={[{ required: true }]}
        optionValueKey="code"
        optionLabelKey="mean"
        options={[{ code: 1, mean: 'a' }, { code: 2, mean: 'b' }]}
        formItemLabel="RadioItem"
        labelCol={7}
      />
      <CheckboxItem
        id="checkboxItem"
        formItemLabel="CheckboxItem"
        labelCol={7}
      />
      <TreeSelectItem
        id="treeSelectItem"
        treeData={treeData}
        formItemLabel="TreeSelectItem"
        labelCol={7}
      />
      <DatePickerItem
        id="datePickerItem"
        formItemLabel="DatePickerItem"
        labelCol={7}
      />
      <RangePickerItem
        id="rangePickerItem"
        formItemLabel="RatePickerItem"
        showTime
        labelCol={7}
      />
      <Button onClick={handleSetFormValue}>set value</Button>
      <Button onClick={handleClearFormValue}>clear value</Button>
      <Button onClick={handleValidateFormValue}>validate value</Button>
    </Form>
  )
}
