import {ArticleDetailResponse} from "@/types/data";
import request from "@/utils/request";


// 获取文章详情
export function getArticleDetail(id: string): Promise<ArticleDetailResponse> {
    return request.get(`/v1_0/articles/${id}`)
}
