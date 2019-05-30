const host = 'https://qq.zhongyi9999.com/e/extend/api/'

// const interfaces = {
//     //获取openID的接口
//     getOpenid: host + 'index.php?m=user&c=getsession/'
// }

function request(url, method, data, header = {}){
    wx.showLoading({
        title:'加载中'
    })
    return new Promise((resolve, reject) => {
        wx.request({
            url: host + url, // 仅为示例，并非真实的接口地址
            method: method,
            data: data,
            headers: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                wx.hideLoading()
                resolve(res.data)
            },
            fail: function (res) {
                wx.hideLoading()
                // reject(false)
            },
            complete: function () {
                wx.hideLoading()
            }
        })
    })
}


function get (obj) {
    return request(obj.url, 'GET', obj.data)
}

function post (obj) {
    return request(obj.url, 'POST', obj.data)
}

export default {
    request,
    get,
    post,
    host
}

// module.exports = interfaces;

