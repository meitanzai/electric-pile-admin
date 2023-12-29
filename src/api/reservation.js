import request from '@/utils/request.js'

export function deleteBatch(data){
    return request({
        url:'/reservation/deleteBatch',
        method:'post',
        data:data
    })
}

export function getAllReservation(data){
    return request({
        url:'/reservation/page',
        method:'post',
        data:data
    })
}

export function deleteById(id){
    return request({
        url:'/reservation/delete/'+id,
        method:'delete',
    })
}

export function addReservation(data) {
    return request({
        url:'/reservation/add',
        method:'post',
        data:data
    })
}