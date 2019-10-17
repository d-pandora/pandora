import React, { useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Table, Button, Col } from 'antd'
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
import { fetchJSONByGet, useFetch } from 'utils/fetchApi'
import { useStore } from 'utils/store'

export default function UserList () {

  const userListStore = useStore('userListStore')

  const [formValue, setFormValue] = userListStore({
    inputItem: '123456',
    selectItem: '2',
    treeSelectItem: ['0-1'],
    rangePickerItem: [moment(), moment()],
  })

  function cacheFormValue(value: any) {
    setFormValue({
      ...formValue,
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
      ],
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
    },
  ]

  function getColumns () {
    return [
      {
        title: '序号',
        width: 100,
        key: 'index',
        render: (text: string, record: any, index: number) => index + 1
      },
      {
        title: '地址',
        width: 100,
        key: 'addr',
        dataIndex: 'addr',
      },
      {
        key: 'detail',
        title: '操作',
        dataIndex: 'id',
        width: 120,
        render: (id: string, row: any) => (
          <div>
            <Link to={`/order/detail/${id}`}>查看</Link>
          </div>
        )
      },
    ]
  }

  const [tableData, fetchTableData, loading] = useFetch(fetchJSONByGet('/api/user/list'), {
    totalCount: 0,
    currentPage: 1,
    pageSize: 20,
    data: [],
  })

  function onPageChange(current: number) {
    fetchTableData({ ...formValue, currentPage: current })
  }

  function handleSubmit () {
    fetchTableData({ ...formValue, currentPage: 1 })
  }

  return (
    <div>
      <Form
        formValue={formValue}
        cacheFormValue={cacheFormValue}
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
          options={[{ code: 1, mean: 'a'}, {code: 2, mean: 'b'}]}
          formItemLabel="SelectItem"
        />
        <RadioItem
          span={6}
          id="radioItem"
          rules={[{ required: true }]}
          optionValueKey="code"
          optionLabelKey="mean"
          options={[{ code: 1, mean: 'a'}, {code: 2, mean: 'b'}]}
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
          formItemLayout={{ labelCol: { span: 5 }, wrapperCol: { span: 19 } }}
        />
        <RangePickerItem
          span={12}
          id="rangePickerItem"
          formItemLabel="RatePickerItem"
          showTime={true}
          formItemLayout={{ labelCol: { span: 5 }, wrapperCol: { span: 19 } }}
        />
        <Col style={{ float: 'right', textAlign: 'right' }} className="pull-right">
          <Button>clear</Button>
          <Button type="primary" onClick={handleSubmit}>submit</Button>
        </Col>
      </Form>
      <Table
        loading={loading}
        columns={getColumns()}
        dataSource={tableData.data}
        bordered={true}
        rowKey="id"
        size="small"
        pagination={{
          onChange: onPageChange,
          pageSize: tableData.pageSize,
          total: tableData.totalCount,
          current: tableData.currentPage,
        }}
      />
    </div>
  )
}
