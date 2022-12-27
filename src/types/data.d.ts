//后台返回数据的类型(公共的泛型工具)
export type ApiResponse<Data> = {
    data: Data
    message: string
}


// 登录接口返回数据=>token
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
