import moment from 'moment'
import { fetchJSONByGet, useFetch } from 'utils/fetchApi'
import { useStore } from 'utils/store'

export default function () {
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

  const userListStore = useStore('userListStore')

  const [formValue, setFormValue] = userListStore(initFormValue)

  const [tableData, fetchTableData, loading] = useFetch(fetchJSONByGet('/api/user/list'), {
    totalCount: 0,
    currentPage: 1,
    pageSize: 20,
    data: [],
  })

  function cacheFormValue(value: any) {
    setFormValue({
      ...formValue,
      ...value,
    })
  }

  return {
    formValue,
    tableData,
    treeData,
    loading,
    initFormValue,
    cacheFormValue,
    setFormValue,
    fetchTableData,
  }
}
