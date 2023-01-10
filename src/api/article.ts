import {
    AddArticleCommentResponse,
    ArticleCommentResponse,
    ArticleDetailResponse
} from "@/types/data";
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

// 对文章发表评论
type DataComment = {
    target: string // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
    content: string // 评论/回复内容
    art_id?: string // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
}

export function addComment(
    data: DataComment
): Promise<AddArticleCommentResponse> {
    return request.post('/v1_0/comments', data)
}
