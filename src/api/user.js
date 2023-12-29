import request from '@/utils/request.js'

export function deleteBatch(data){
    return request({
        url:'/user/deleteBatch',
        method:'post',
        data:data
    })
}

export function getAllUser(data){
    return request({
        url:'/user/page',
        method:'post',
        data:data
    })
}

export function deleteById(id){
    return request({
        url:'/user/delete/'+id,
        method:'delete',
    })
}

export function addUser(data) {
    return request({
        url:'/user/add',
        method:'post',
        data:data
    })
}