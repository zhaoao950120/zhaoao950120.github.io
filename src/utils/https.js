
const https = {
    request(options = {}) {
        const {url,data} = options;

        //加载动画
        wxRequest.showLoading({
            title:'加载中...'
        })

        return new Promise((resolve,reject) => {
            wxRequest.request({
                url,
                data,
                success:function(res) {
                    wxRequest.hideLoading();
                }
            })
        })
    }
}

export default https;