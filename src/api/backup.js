import request from '@/utils/request'

export function getList(params) {
  return request({
    // baseURL:'/api',
    // url: '/database/index',
    baseURL:'http://localhost:9999',
    url:'/database/index',
    method: 'get',
    params
  })
}
export function deleteList(fileName){
  return request({
    baseURL:'http://localhost:9999',
    url:'/database/delete',
    method:'get',
    params: {
      fileName
    },
    // params
  })
}
export function backup(){
  return request({
    baseURL:'http://localhost:9999',
    url:'/database/backup',
    method:'get'
  })
}
export function download(fileName){
  return request({
    baseURL:'http://localhost:9999',
    url:'/database/download',
    method:'get',
    params: {
      fileName
    },
  })
}
export function restoreList(fileName){
  return request({
    baseURL:'http://localhost:9999',
    url:'/database/restore',
    method:'get',
    params: {
      fileName
    },
    // params
  })
}

export function upload(data){
  return request({
    baseURL:'http://localhost:9999',
    url:'/database/upload',
    method:'post',
    data,
  })
}
