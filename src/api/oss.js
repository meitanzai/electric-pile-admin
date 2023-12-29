import request from '@/utils/request.js'

export function policy() {
    return request({
        url:'/aliyun/oss/policy',
        method:'get',
    })
}