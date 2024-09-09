import queryString from "query-string"

export const getQueryString = (data: any): string => {
    return queryString.stringify(data)
}