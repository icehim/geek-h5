//后台返回数据的类型(公共的泛型工具)
export type ApiResponse<Data> = {
    data: Data// 不同接口返回的data数据不一
    message: string
}


// 1.登录接口返回数据=>token
export type Token = {
    token?: string
    refresh_token?: string
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
//5.频道
export type Channel = {
    id: number
    name: string
}
// 用户频道 | 所有频道
export type UserChannel = {
    channels: Channel[]
}

export type UserChannelResponse = ApiResponse<UserChannel>

// 文章列表
export type ArticlesItem = {
    art_id: string
    aut_id: string
    aut_name: string
    comm_count: number
    cover: {
        type: 0 | 1 | 3
        images: string[]
    }
    pubdate: string
    title: string
}
export type Articles = {
    pre_timestamp: number
    results: ArticlesItem[]
}
export type ArticlesResponse = ApiResponse<Articles>

//联想词
export type Suggests = {
    options: string[]

}
export type SuggestsResponse = ApiResponse<Suggests>


// 搜索结果
export type SearchResult = {
    page: number
    per_page: number
    total_count: number
    results: Articles['results']
}
export type SearchResultResponse = ApiResponse<SearchResult>

// -- 文章详情 --
export type ArticleDetail = {
    art_id: string
    title: string
    pubdate: string
    aut_id: string
    aut_name: string
    aut_photo: string
    is_followed: boolean
    attitude: number
    content: string
    is_collected: boolean
    // 接口中缺失
    comm_count: number
    like_count: number
    read_count: number
}
export type ArticleDetailResponse = ApiResponse<ArticleDetail>
