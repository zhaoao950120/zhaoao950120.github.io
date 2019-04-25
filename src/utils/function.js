// 自定义工具函数

/* 获取当前路由栈参数 */
export function getQuery() {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const options = currentPage.options
    return options
} 
