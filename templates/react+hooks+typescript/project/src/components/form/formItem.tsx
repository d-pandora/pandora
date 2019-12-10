import React, { useContext } from 'react'
import {
  Form, Input, Select, InputNumber, Radio, Checkbox, TreeSelect, DatePicker, Col,
} from 'antd'
import FormContext from './formContext'

import {
  InputItemProps,
  SelectItemProps,
  InputNumberItemProps,
  TextAreaItemProps,
  RadioItemProps,
  CheckboxItemProps,
  TreeSelectItemProps,
  DatePickerItemProps,
  RangePickerItemProps,
} from './interface'

const FormItem = Form.Item
const { Option } = Select
const { TextArea } = Input
const { RangePicker } = DatePicker

export function InputItem(props: InputItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, span, initialValue, ...inputProps
  } = props
  return (
    <Col span={span || 24}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
          })(<Input {...inputProps} />)
        }
      </FormItem>
    </Col>
  )
}

export function InputNumberItem(props: InputNumberItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, span, initialValue, ...inputNumberProps
  } = props
  return (
    <Col span={span || 24}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
          })(<InputNumber {...inputNumberProps} />)
        }
      </FormItem>
    </Col>
  )
}

export function TextAreaItem(props: TextAreaItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, span, initialValue, ...inputProps
  } = props
  return (
    <Col span={span || 24}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
          })(<TextArea {...inputProps} />)
        }
      </FormItem>
    </Col>
  )
}

export function SelectItem(props: SelectItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, optionValueKey, optionLabelKey, options, span, initialValue, ...selectProps
  } = props
  return (
    <Col span={span || 24}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
          })(
            <Select
              {...selectProps}
            >
              {options && options.map((option, index) => (
                <Option
                  key={index.toString()}
                  value={option[optionValueKey || 'code']}
                >
                  {option[optionLabelKey || 'mean']}
                </Option>
              ))}
            </Select>,
          )
        }
      </FormItem>
    </Col>
  )
}

export function RadioItem(props: RadioItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, optionValueKey, optionLabelKey, options, span, initialValue, ...radioProps
  } = props
  return (
    <Col span={span || 24}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
          })(
            <Radio.Group
              style={{ whiteSpace: 'nowrap' }}
              name={id.toString()}
              {...radioProps}
            >
              {options && options.map((option, index) => (
                <Radio
                  key={index.toString()}
                  value={optionValueKey && option[optionValueKey]}
                >
                  {optionLabelKey && option[optionLabelKey]}
                </Radio>
              ))}
            </Radio.Group>,
          )
        }
      </FormItem>
    </Col>
  )
}

export function CheckboxItem(props: CheckboxItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, span, checkBoxLabel, initialValue,
  } = props
  return (
    <Col span={span || 24}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
            valuePropName: 'checked',
          })(<Checkbox>{checkBoxLabel}</Checkbox>)
        }
      </FormItem>
    </Col>
  )
}

export function TreeSelectItem(props: TreeSelectItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, span, initialValue, ...treeSeleteOptions
  } = props
  return (
    <Col span={span || 24}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
          })(<TreeSelect {...treeSeleteOptions} />)
        }
      </FormItem>
    </Col>
  )
}

export function DatePickerItem(props: DatePickerItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, span, initialValue, ...datePickerOptions
  } = props
  return (
    <Col span={span || 24}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
          })(<DatePicker {...datePickerOptions} />)
        }
      </FormItem>
    </Col>
  )
}

export function RangePickerItem(props: RangePickerItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, span, initialValue, ...rangePickerOptions
  } = props
  return (
    <Col span={span || 24}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
          })(
            <RangePicker
              style={{ width: '100%' }}
              key={id.toString()}
              {...rangePickerOptions}
            />,
          )
        }
      </FormItem>
    </Col>
  )
}
