import request from '@/utils/request.js'

export function deleteBatch(data){
    return request({
        url:'/recharge/deleteBatch',
        method:'post',
        data:data
    })
}

export function getAllRecharge(data){
    return request({
        url:'/recharge/page',
        method:'post',
        data:data
    })
}

export function deleteById(id){
    return request({
        url:'/recharge/delete/'+id,
        method:'delete',
    })
}

export function addOrUpdateRecharge(data) {
    return request({
        url:'/recharge/addOrUpdate',
        method:'post',
        data:data
    })
}