import qs from 'qs'
import { RequsetType } from '@/settings/enum'
type requsetMethod = RequsetType.GET | RequsetType.POST | RequsetType.PUT | RequsetType.DELETE
interface IRequestData {
  [key: string]: Object | String
}

interface IRequestOption {
  method?: requsetMethod
  url: string
  data?: IRequestData
}

const BASE_URL = 'http://localhost:3333'

//
// export default async (option: IRequestOption = { url: '', data: {}, method: RequsetType.GET }) => {
//   option.url = BASE_URL + option.url
//   const method = option.method.toUpperCase()

//   if (method === RequsetType.GET || method === RequsetType.DELETE) {
//     let dataStr = ''
//     dataStr += '?' + qs.stringify(option.data)
//   }

//   let requestConfig = {
//     credentials: 'same-origin',
//     method,
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     mode: 'cors',
//     cache: 'default'
//   }
// }

function request(
  option: IRequestOption = {
    url: '',
    data: {},
    method: RequsetType.GET
  }
) {
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    let config = {
      headers: {
        authorization: localStorage.getItem('token') || ''
      }
    }

    option.url = BASE_URL + option.url
    const method = option.method ? option.method.toUpperCase() : RequsetType.GET

    if (method === RequsetType.GET || method === RequsetType.DELETE) {
      const isEmptyData = JSON.stringify(option.data)
      if (isEmptyData) {
        option.url += '?' + qs.stringify(option.data)
      }
    } else if (method === RequsetType.POST || method === RequsetType.PUT) {
      Object.assign(config, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...config.headers
        }
      })
      const params = JSON.stringify(option.data)
      params && Object.assign(config, { body: params })
    }

    console.log('fetch..')
    try {
      const response = await fetch(option.url, {
        mode: 'cors',
        ...config
      })
      response
        .json()
        .then(res => {
          resolve(res)
        })
        .catch(err => reject(err))
    } catch (err) {
      reject(err)
    }
  })
}

export default request
