import request from '@/utils/request.js'

export function deleteBatch(data){
    return request({
        url:'/pile/deleteBatch',
        method:'post',
        data:data
    })
}

export function getAllPile(data){
    return request({
        url:'/pile/page',
        method:'post',
        data:data
    })
}

export function deleteById(id){
    return request({
        url:'/pile/delete/'+id,
        method:'delete',
    })
}

export function addPile(data) {
    return request({
        url:'/pile/add',
        method:'post',
        data:data
    })
}