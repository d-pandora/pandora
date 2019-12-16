import { fetchJSONByGet } from 'utils/fetchApi'

export const getShopSearchList = fetchJSONByGet('api/common/shopSearch')

export const getRiderSearchList = fetchJSONByGet('api/common/riderSearch')

export const getStaffSearchList = fetchJSONByGet('api/common/staffSearch')
