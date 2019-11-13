import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Modal } from 'antd'
import { Moment } from 'moment'
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

interface FormValue {
  inputItem?: string;
  selectItem?: string;
  treeSelectItem?: string[];
  rangePickerItem?: Moment[];
}

export interface ImperativeHandles {
  show(formValue: FormValue, type?: 'add' | 'edit'): void;
}

function addEdit(props: any, ref: React.Ref<ImperativeHandles>) {
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

  const [visible, setVisible] = useState(false)

  const [type, setType] = useState('add')

  const [formValue, setFormValue] = useState({})

  useImperativeHandle(ref, () => ({
    show(formValue: FormValue, type?: 'add' | 'edit') {
      setFormValue(formValue)
      setVisible(true)
      setType(type || 'add')
    },
  }))

  function cacheFormValue(value: any) {
    setFormValue({
      ...formValue,
      ...value,
    })
  }


  function handleSave() {
    // todo
  }

  function handleCancel() {
    setVisible(false)
  }

  return (
    <Modal
      title={type === 'add' ? '新增' : '编辑'}
      visible={visible}
      onOk={handleSave}
      okText="确定"
      cancelText="取消"
      onCancel={handleCancel}
    >
      <Form
        formValue={formValue}
        cacheFormValue={cacheFormValue}
      >
        <InputItem
          rules={[{ required: true }]}
          id="inputItem"
          formItemLabel="InputItem"
        />
        <InputNumberItem
          rules={[{ required: true }]}
          id="inputNumberItem"
          formItemLabel="InputNumberItem"
        />
        <SelectItem
          id="selectItem"
          rules={[{ required: true }]}
          optionValueKey="code"
          optionLabelKey="mean"
          options={[{ code: 1, mean: 'a' }, { code: 2, mean: 'b' }]}
          formItemLabel="SelectItem"
        />
        <RadioItem
          id="radioItem"
          rules={[{ required: true }]}
          optionValueKey="code"
          optionLabelKey="mean"
          options={[{ code: 1, mean: 'a' }, { code: 2, mean: 'b' }]}
          formItemLabel="RadioItem"
        />
        <CheckboxItem
          id="checkboxItem"
          formItemLabel="CheckboxItem"
        />
        <TreeSelectItem
          id="treeSelectItem"
          treeData={treeData}
          formItemLabel="TreeSelectItem"
        />
        <DatePickerItem
          id="datePickerItem"
          formItemLabel="DatePickerItem"
        />
        <RangePickerItem
          id="rangePickerItem"
          formItemLabel="RatePickerItem"
          showTime
        />
      </Form>
    </Modal>
  )
}

export default forwardRef(addEdit)
