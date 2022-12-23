const path = require('path')
//配置px转换vw=>移动端适配
const pxToViewport = require('postcss-px-to-viewport')
const vw = pxToViewport({
    // 视口宽度，一般就是 375（ 设计稿一般采用二倍稿，宽度为 375 ）
    viewportWidth: 375
})


module.exports = {
    // webpack 配置
    webpack: {
        // 配置别名
        alias: {
            // 约定：使用 @ 表示 src 文件所在路径
            '@': path.resolve(__dirname, 'src'),
            // 约定：使用 @scss 表示全局 SASS 样式所在路径
            // 在 SASS 中使用
            '@scss': path.resolve(__dirname, 'src/styles')
        }
    },
    // 适配
    // style: {
    //   postcss: {
    //     plugins: [vw]
    //   }
    // }
    style: {
        postcss: {
            mode: 'extends',
            loaderOptions: {
                postcssOptions: {
                    ident: 'postcss',
                    plugins: [vw]
                }
            }
        }
    }
}
