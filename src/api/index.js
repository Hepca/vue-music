import request from '../utils/requert'

// 首页轮播图
export function queryBannerList(query) {
    return request({
        url: 'https://www.fastmock.site/mock/d228d7624d0db9b7bb6ccce88c74a777/music/recommend',
        method: 'post',
        params: query
    })
}

// 歌单推荐
export function queryRecommendList(query) {
    return request({
        url: 'https://www.fastmock.site/mock/d228d7624d0db9b7bb6ccce88c74a777/music/recomPlaylist',
        method: 'post',
        params: query

    })
}

// 歌手列表
export function querySingerList(query) {
    return request({
        url: 'https://www.fastmock.site/mock/d228d7624d0db9b7bb6ccce88c74a777/music/singerList',
        method: 'post',
        params: query
    })
}