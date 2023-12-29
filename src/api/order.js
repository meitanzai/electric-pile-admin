import request from '@/utils/request.js'

export function deleteBatch(data){
    return request({
        url:'/order/deleteBatch',
        method:'post',
        data:data
    })
}

export function getAllOrder(data){
    return request({
        url:'/order/page',
        method:'post',
        data:data
    })
}

export function deleteById(id){
    return request({
        url:'/order/delete/'+id,
        method:'delete',
    })
}

export function addOrder(data) {
    return request({
        url:'/order/add',
        method:'post',
        data:data
    })
}