import React, { useState } from 'react'
import { useStore } from 'utils/store'
import moment from 'moment'
import { fetchJSONByGet } from 'utils/fetchApi'

export default function () {
  const userListStore = useStore('userListStore')

  const [formValue, setFormValue] = userListStore({
    inputItem: '123456',
    selectItem: '2',
    treeSelectItem: ['0-0-2'],
    rangePickerItem: [moment(), moment()],
  })

  const [tableData, setTableData] = useState({
    totalCount: 0,
    currentPage: 1,
    pageSize: 20,
    data: [],
    loading: false,
  })

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


  function cacheFormValue(value: any) {
    setFormValue({
      ...formValue,
      ...value,
    })
  }

  async function  fetchTableData (current: number) {
    setTableData({
      ...tableData,
      loading: true,
    })
    const result = await fetchJSONByGet('/api/user/list', {
      ...formValue,
      current,
    })
    setTableData({
      ...result.data,
      loading: false,
    })
  }

  return {
    formValue,
    tableData,
    treeData,
    cacheFormValue,
    fetchTableData,
  }

}