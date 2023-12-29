import request from '@/utils/request.js'

export function getOnlineInfo(){
    return request({
        url:'/echarts/onlinePie',
        method:'get'
    })
}

export function getOrderInfo(){
    return request({
        url:'/echarts/order',
        method:'get'
    })
}