// utils/history.js 中：
// 获取路由实例对象
// 导入创建自定义 history 的函数：
import {createBrowserHistory} from 'history'

// 创建自定义 history 模式
const customHistory = createBrowserHistory()
// hash 模式
// const customHistory = createHashHistory()

export {customHistory}
