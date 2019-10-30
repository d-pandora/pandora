import React, { useContext } from 'react'
import {
  Form, Input, Select, InputNumber, Radio, Checkbox, TreeSelect, DatePicker, Col,
} from 'antd'
import { FormContext } from './index'

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

const defaultFormItemLayout = { labelCol: { span: 10 }, wrapperCol: { span: 14 } }

export function InputItem(props: InputItemProps) {
  const { form } = useContext(FormContext)
  const {
    formItemLayout, formItemLabel, rules, id, span, ...inputProps
  } = props
  return (
    <Col span={span || 24}>
      <FormItem {...(formItemLayout || defaultFormItemLayout)} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
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
    formItemLayout, formItemLabel, rules, id, span, ...inputNumberProps
  } = props
  return (
    <Col span={span || 24}>
      <FormItem {...(formItemLayout || defaultFormItemLayout)} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
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
    formItemLayout, formItemLabel, rules, id, span, ...inputProps
  } = props
  return (
    <Col span={span || 24}>
      <FormItem {...(formItemLayout || defaultFormItemLayout)} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
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
    formItemLayout, formItemLabel, rules, id, optionValueKey, optionLabelKey, options, span, ...selectProps
  } = props
  return (
    <Col span={span || 24}>
      <FormItem {...(formItemLayout || defaultFormItemLayout)} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            rules: rules || [],
          })(
            <Select
              {...selectProps}
            >
              {options && options.map((option, index) => (
                <Option
                  key={index.toString()}
                  value={option[optionValueKey || 'code'].toString()}
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
    formItemLayout, formItemLabel, rules, id, optionValueKey, optionLabelKey, options, span, ...radioProps
  } = props
  return (
    <Col span={span || 24}>
      <FormItem {...(formItemLayout || defaultFormItemLayout)} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
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
                  value={optionValueKey && option[optionValueKey].toString()}
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
    formItemLayout, formItemLabel, rules, id, span, checkBoxLabel,
  } = props
  return (
    <Col span={span || 24}>
      <FormItem {...(formItemLayout || defaultFormItemLayout)} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
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
    formItemLayout, formItemLabel, rules, id, span, ...treeSeleteOptions
  } = props
  return (
    <Col span={span || 24}>
      <FormItem {...(formItemLayout || defaultFormItemLayout)} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
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
    formItemLayout, formItemLabel, rules, id, span, ...datePickerOptions
  } = props
  return (
    <Col span={span || 24}>
      <FormItem {...(formItemLayout || defaultFormItemLayout)} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
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
    formItemLayout, formItemLabel, rules, id, span, ...rangePickerOptions
  } = props
  return (
    <Col span={span || 24}>
      <FormItem {...(formItemLayout || defaultFormItemLayout)} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
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
