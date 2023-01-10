import {ArticleDetailResponse} from "@/types/data";
import request from "@/utils/request";


// 获取文章详情
export function getArticleDetail(id: string): Promise<ArticleDetailResponse> {
    return request.get(`/v1_0/articles/${id}`)
}

// 关注作者
export function follow(id: string) {
    return request.post('/v1_0/user/followings', {
        target: id,
    })
}

// 取关作者
export function unFollow(id: string) {
    return request.delete(`/v1_0/user/followings/${id}`)
}
