import {ArticleCommentResponse, ArticleDetailResponse} from "@/types/data";
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

// 收藏文章
export function fav(art_id: string) {
    return request.post('/v1_0/article/collections', {
        target: art_id,
    })
}

// 取消收藏文章
export function unFav(art_id: string) {
    return request.delete(`/v1_0/article/collections/${art_id}`)
}

// 获取评论数据
/**
 *
 * @param type a或c 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @param id 文章id或评论id
 * @param offset 获取评论数据的偏移量，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * @returns
 */
export function getComments(
    type: string,
    id: string,
    offset: string | null
): Promise<ArticleCommentResponse> {
    return request.get('/v1_0/comments', {params: {type, source: id, offset}})
}
