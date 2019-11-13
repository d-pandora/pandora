import moment from 'moment'
import { fetchUserListApi } from 'api/user'
import { createStore } from 'east-store'

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


const userListStore = createStore({
  tableData: {
    totalCount: 0,
    currentPage: 1,
    pageSize: 20,
    data: [],
  },
  formValue: initFormValue,
  treeData,
}, {
  cacheFormValue: (value: typeof initFormValue) => (state) => {
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
    const result = await fetchUserListApi(query)
    state.tableData = result
    return state
  },
})

export default userListStore
