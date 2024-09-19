import { useSearchParams } from 'react-router-dom'
import { getQueryString } from '../utils/queryString'

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const setQueryParams = (values: any) => {
    const currentParams = Object.fromEntries([...searchParams])
    const qs = getQueryString({
      page: 1,
      limit: 10,
      ...currentParams,
      ...values
    })
    setSearchParams(qs)
  }

  const setDefaultPaginationParams = () => {
    const defaultPagi = {
      page: 1,
      limit: 10
    }

    const qs = getQueryString(defaultPagi)
    setSearchParams(qs)
  }

  const getOrderNumberByPage = (index: number) => {
    const { page, limit } = Object.fromEntries([...searchParams])
    if (page && limit) {
      return (+page - 1) * +limit + index
    }

    return index
  }

  return { queryParams: searchParams, setQueryParams, setDefaultPaginationParams, getOrderNumberByPage }
}

export default useQueryParams