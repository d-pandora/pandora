import { fetchJSONByGet } from 'utils/fetchApi'

export const fetchUserListApi = fetchJSONByGet('/api/user/list')
export const fetchUserDetailApi = fetchJSONByGet('/api/user/detail')
