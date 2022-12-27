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
