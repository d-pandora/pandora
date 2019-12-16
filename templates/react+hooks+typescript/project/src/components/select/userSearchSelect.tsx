import React, { useState, useEffect } from 'react'
import { Select, message } from 'antd'
import { debounce } from 'lodash'
import { WrappedFormUtils } from 'antd/lib/form/Form'

import {
  getShopSearchList,
  getRiderSearchList,
  getStaffSearchList,
} from 'api/common'

const { Option } = Select

export interface UserSearchSelectProps {
  className?: string;
  disabled?: boolean;
  type: 'user' | 'rider' | 'staff';
  cityId?: number;
  placeholder?: string;
  value?: number;
  onChange?: (record: any) => void;
  onClear?: () => void;
  form?: WrappedFormUtils;
  id?: string;
}

interface SelectOption {
  id: number;
  name: string;
  picName?: string;
  mobile?: string;
  title?: string;
  code?: string;
  departName?: string;
}

export default function UserSearchSelect (props: UserSearchSelectProps) {
  const { className, disabled, placeholder, type, value, form, id, onChange } = props
  const [options, setOptions] = useState<SelectOption[]>([])

  useEffect(() => {
    setOptions([])
  }, [type])

  async function fetchSearchList (key?: string) {
    if (!key || key.trim() === '') {
      return
    }
    const { cityId } = props
    if (!cityId && type !== 'staff') {
      message.error('没有城市无法查询！')
      return
    }
    if (!type) {
      message.error('没有类型无法查询！')
      return
    }
    const param = { cityId, key }
    let data: any = null

    if (type === 'rider') {
      // 骑手
      data = await getRiderSearchList(param)
    } else if (type === 'user') {
      // 商家
      data = await getShopSearchList(param)
    } else if (type === 'staff') {
      // 员工
      data = await getStaffSearchList(param)
    }
    if (!data) {
      return
    }
    if (data) {
      setOptions(data as SelectOption[])
    }
  }

  const handleSearch = debounce(fetchSearchList, 500)

  const handleChange = (value: number) => {
    if (value === undefined) {
      setOptions([])
    }
  }

  const handleSelect = (value?: number) => {
    const item = options.find((option) => (type === 'staff' ? option.code === value : option.id === Number(value)))
    if (!item) {
      return
    }
    if (form && id) {
      form.setFields({
        [id]: { value, option: item },
      })
      form.validateFields([id])
    } else if (typeof onChange === 'function') {
      onChange(item)
    }
  }

  useEffect(() => {
    const item = options.find((option) => (option.id === value))
    if (!item) {
      fetchSearchList(value ? value.toString() : '').then(() => {
        handleSelect(value)
      })
    } else {
      handleSelect(value)
    }
  }, [value])

  return (
    <Select
      className={className}
      disabled={disabled}
      value={value}
      showSearch
      allowClear
      placeholder={placeholder}
      optionFilterProp="children"
      notFoundContent="暂无搜索结果"
      onChange={handleChange}
      onSearch={handleSearch}
      onSelect={handleSelect}
      style={{ width: '100%' }}
    >
      {
        options.map((item) => {
          if (!item.id) {
            return null
          }
          if (type === 'user') {
            const title = `${item.name}${item.picName ? `-${item.picName}` : ''}${item.mobile ? `-${item.mobile}` : ''}`
            return <Option key={item.id} value={item.id} title={title}>{title}</Option>
          }
          if (type === 'rider') {
            const title = `${item.name}-(${item.id})-${item.mobile}`
            return <Option key={item.id} value={item.id} title={title}>{title}</Option>
          }
          if (type === 'staff') {
            const title = `${item.departName}-(${item.name})-${item.code}`
            return <Option key={item.code} value={item.code} title={title}>{title}</Option>
          }
          return null
        })
      }
    </Select>
  )
}
