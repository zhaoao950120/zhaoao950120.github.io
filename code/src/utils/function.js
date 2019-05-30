// 自定义工具函数

/* 获取当前路由栈参数 */
export function getQuery() {
    const pages = getCurrentPages() //获取加载的页面
    const currentPage = pages[pages.length - 1] //获取当前页面的对象
    const options = currentPage.options //如果要获取url中所带的参数可以查看options
    return options
} 
