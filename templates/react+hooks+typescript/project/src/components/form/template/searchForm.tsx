import React from 'react'
import { SearchForm, IFormColumnValue } from 'components/form/index'

// store start ==============
import moment from 'moment'
import { createStore } from 'east-store'
import { fetchUserListApi, fetchUseListExportApi } from 'api/user'

const initFormValue = {
  inputItem: '123456',
  selectItem: '2',
  treeSelectItem: ['0-1'],
  start: moment('2019-11-11'),
  end: moment(),
}

const userListStore = createStore({
  tableData: {
    totalCount: 0,
    currentPage: 1,
    pageSize: 20,
    data: [],
  },
  formValue: initFormValue,
  tableLoading: false,
}, {
  toggleLoading: () => (state) => {
    state.tableLoading = !state.tableLoading
  },
  formFieldChange: (value: typeof initFormValue) => (state) => {
    state.formValue = {
      ...state.formValue,
      ...value,
    }
    return state
  },
  setFormValue: () => (state) => {
    state.formValue = {
      ...initFormValue,
    }
    return state
  },
  fetchTableData: (query) => async (state) => {
    userListStore.getActions().toggleLoading()
    const result = await fetchUserListApi(query)
    userListStore.getActions().toggleLoading()
    state.tableData = result
    return state
  },
  fetchUseListExport: (filename: string, query?: any) => () => {
    fetchUseListExportApi(query, filename)
  },
})
// store end ==============

export default function SearchFormTemplate () {
  const [state, actions] = userListStore.useStore()

  function handleSubmit () {
    actions.fetchTableData({ ...state.formValue, currentPage: 1 })
  }

  function getFormColumns () {
    const formColumns: IFormColumnValue[] = [
      {
        type: 'text',
        id: 'shopId',
        formItemLabel: 'ID',
        span: 6,
      },
      {
        type: 'select',
        id: 'status',
        formItemLabel: '状态',
        options: [{ code: 1, mean: 'a' }, { code: 2, mean: 'b' }],
        optionLabelKey: 'mean',
        optionValueKey: 'code',
        span: 6,
      },
      {
        type: 'rangePicker',
        id: ['start', 'end'],
        formItemLabel: '日期',
        allowClear: true,
        span: 12,
      },
    ]
    return formColumns
  }

  return (
    <SearchForm
      formColumns={getFormColumns()}
      formValue={state.formValue}
      formFieldChange={actions.formFieldChange}
      onSearch={handleSubmit}
    />
  )
}
