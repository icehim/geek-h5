//后台返回数据的类型(公共的泛型工具)
export type ApiResponse<Data> = {
    data: Data// 不同接口返回的data数据不一
    message: string
}


// 1.登录接口返回数据=>token
export type Token = {
    token: string
    refresh_token: string
}

//表单数据类型
export type LoginFormData = {
    mobile: string
    code: string
}

//登录接口response类型
export type LoginResponse = ApiResponse<Token>

// 2.登陆人数据
export type User = {
    id: string
    name: string
    photo: string
    art_count: number
    follow_count: number
    fans_count: number
    like_count: number
}

export type UserResponse = ApiResponse<User>
// 3.用户修改数据
export type UserProfile = {
    id: string
    photo: string
    name: string
    mobile: string
    gender: number
    birthday: string
    intro: string
}
export type UserProfileResponse = ApiResponse<UserProfile>

//4.上传头像
export type UploadResponse = ApiResponse<{ photo: string }>
