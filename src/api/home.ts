import request from "@/utils/request";
import {ArticlesResponse} from "@/types/data";

type Params = {
    channel_id: number
    timestamp: number
}

export function getArticleListApi(params: Params): Promise<ArticlesResponse> {
    return request.get('/v1_0/articles', {params})
}
