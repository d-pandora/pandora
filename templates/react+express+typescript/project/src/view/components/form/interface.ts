import { FormComponentProps } from 'antd/es/form'
import { SelectProps } from 'antd/es/select'
import { InputProps, TextAreaProps } from 'antd/es/input'
import { InputNumberProps } from 'antd/es/input-number'
import { RadioProps } from 'antd/es/radio'
import { CheckboxProps } from 'antd/es/checkbox'
import { TreeSelectProps } from 'antd/es/tree-select'
import { DatePickerProps, RangePickerProps } from 'antd/es/date-picker/interface'

export interface FormProps extends FormComponentProps {
  className?: string;
  children: React.ReactNode;
  formValue: { [key: string]: any };
  formFieldChange: Function;
}

interface FormItemProps {
  id: string;
  labelCol?: number;
  wrapperCol?: number;
  span?: number;
  rules?: any[];
  formItemLabel?: string;
}


export declare type OmitAttrs = 'id' | 'form'

export interface InputItemProps extends FormItemProps, Omit<InputProps, OmitAttrs> {
}

export interface TextAreaItemProps extends FormItemProps, Omit<TextAreaProps, OmitAttrs> {
}

export interface InputNumberItemProps extends FormItemProps, Omit<InputNumberProps, OmitAttrs> {
}

export interface SelectItemProps extends FormItemProps, Omit<SelectProps, OmitAttrs> {
  optionValueKey: string;
  optionLabelKey: string;
  optionPinyinKey?: string;
  options: any[];
}

export interface RadioItemProps extends FormItemProps, Omit<RadioProps, OmitAttrs> {
  options: any[];
  optionValueKey?: string;
  optionLabelKey?: string;
}

export interface CheckboxItemProps extends FormItemProps, Omit<CheckboxProps, OmitAttrs> {
  checkBoxLabel?: React.ReactNode | string;
}

export interface TreeSelectItemProps extends FormItemProps, Omit<TreeSelectProps<any>, OmitAttrs> {
}

export interface DatePickerItemProps extends FormItemProps, Omit<DatePickerProps, OmitAttrs> {
}

export interface RangePickerItemProps extends FormItemProps, Omit<RangePickerProps, OmitAttrs> {
}
