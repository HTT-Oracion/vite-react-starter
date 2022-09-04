import request from './index'
import { RequsetType } from '@/settings/enum'
export const getUserList = () => {
  return request({
    url: '/admin/userlist'
  })
}

export const userRegister = () => {
  return request({
    url: '/register',
    method: RequsetType.POST,
    data: {
      id: Date.now(),
      username: 'test',
      mobile: 13048009711,
      password: 123456,
      email: 'test123@qq.com'
    }
  })
}

export const userLogin = () => {
  return request({
    url: '/login',
    method: RequsetType.POST,
    data: {
      username: 'test',
      password: 123456
    }
  })
}
