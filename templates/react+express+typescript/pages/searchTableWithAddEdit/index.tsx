import React, { useRef } from 'react'
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
import AddEdit, { ImperativeHandles } from './addEdit'

export default function ModuleName () {

  const initFormValue = {
    inputItem: '123456',
    selectItem: '2',
    treeSelectItem: ['0-1'],
    rangePickerItem: [moment(), moment()],
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

  const moduleNameStore = useStore('moduleNameStore')

  const [formValue, setFormValue] = moduleNameStore(initFormValue)

  const [tableData, fetchTableData, loading] = useFetch(fetchJSONByGet('/api/user/list'), {
    totalCount: 0,
    currentPage: 1,
    pageSize: 20,
    data: [],
  })

  const addEdit = useRef<ImperativeHandles>(null)

  function cacheFormValue(value: any) {
    setFormValue({
      ...formValue,
      ...value,
    })
  }


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
        render: (id: string, record: any) => (
          <div>
            <Button size="small" type="primary" onClick={() => handleEdit(record)}></Button>
            <Link to={`/order/detail/${id}`}>查看</Link>
          </div>
        )
      },
    ]
  }

  function handleSubmit () {
    fetchTableData({ ...formValue, currentPage: 1 })
  }

  function handleReset () {
    setFormValue(initFormValue)
  }

  function onPageChange(current: number) {
    fetchTableData({ ...formValue, currentPage: current })
  }

  function handleAdd () {
    if (addEdit && addEdit.current) {
      addEdit.current.show({})
    }
  }

  function handleEdit (record: any) {
    if (addEdit && addEdit.current) {
      addEdit.current.show(record, 'edit')
    }
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
          <Button className="mr8" onClick={handleReset}>clear</Button>
          <Button type="primary" onClick={handleSubmit}>submit</Button>
        </Col>
      </Form>
      <Button className="mb8 mt8" type="primary" onClick={handleAdd}>新增</Button>
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
      <AddEdit ref={addEdit} />
    </div>
  )
}
