import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react'
import { Drawer, Button } from 'antd'
import moment, { Moment } from 'moment'
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

interface FormValue {
  inputItem?: string;
  selectItem?: string;
  treeSelectItem?: string[];
  rangePickerItem?: Moment[];
}

export interface ImperativeHandles {
  show(formValue: FormValue, type?: 'add' | 'edit'): void;
}

function modalForm (props: any, ref: React.Ref<ImperativeHandles>) {
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

  const formRef = useRef<FormHandles>(null)

  useImperativeHandle(ref, () => ({
    show (formValue: FormValue, type?: 'add' | 'edit') {
      setVisible(true)
      setType(type || 'add')
    },
  }))

  function handleSave () {
    formRef.current?.validate((err: Error, values: any) => {
      if (!err) {
        console.log('..../', err, values)
      }
    })
    console.log('....this.ref', formRef.current?.setFormValue({
      inputItem: 1,
      inputNumberItem: 1,
      selectItem: 2,
      radioItem: 2,
      checkboxItem: true,
      treeSelectItem: '0-1',
      datePickerItem: moment(),
      rangePickerItem: [moment(), moment()],
    }))
    console.log('....this.getvalue', formRef.current?.getFormValue())
    setTimeout(() => {
      formRef.current?.clear()
    }, 300)
    // todo
  }

  function handleCancel () {
    setVisible(false)
  }

  return (
    <Drawer
      title={type === 'add' ? '新增' : '编辑'}
      visible={visible}
      onClose={handleCancel}
      width={600}
      bodyStyle={{ paddingBottom: 60, paddingTop: 60 }}
      headerStyle={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 10,
      }}
    >
      <Form
        wrappedComponentRef={formRef}
      >
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
      </Form>
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 10,
        }}
      >
        <Button onClick={handleCancel} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button onClick={handleSave} type="primary">
          Submit
        </Button>
      </div>
    </Drawer>
  )
}

export default forwardRef(modalForm)
