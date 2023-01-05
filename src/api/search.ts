import request from "@/utils/request";
import {SearchResultResponse, SuggestsResponse} from "@/types/data";

export function getSuggestsListApi(q: string): Promise<SuggestsResponse> {
    return request.get('/v1_0/suggestion', {params: {q}})
}

// 获取搜索结果列表
type ParamsSearch = {
    q: string | null  //关键词
    page: number//第几页
}

export function getSearchList(
    params: ParamsSearch
): Promise<SearchResultResponse> {
    return request.get('/v1_0/search', {params})
}
