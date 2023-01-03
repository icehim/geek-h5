import request from "@/utils/request";
import {UploadResponse} from "@/types/data";

/**
 * 上传头像
 * @param data 图片file对象
 */
export function uploadPhotoApi(data: FormData): Promise<UploadResponse> {
    return request.patch('/v1_0/user/photo', data)
}
