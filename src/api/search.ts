import request from "@/utils/request";
import {SuggestsResponse} from "@/types/data";

export function getSuggestsListApi(q: string): Promise<SuggestsResponse> {
    return request.get('/v1_0/suggestion', {params: {q}})
}
