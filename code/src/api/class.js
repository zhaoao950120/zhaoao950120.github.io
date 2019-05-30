import WxRequest from "../utils/wx-request"

// 获取栏目
export function getClassList(){
    const url = "index.php"
    const data = {
        m: "class",
        c: "class"
    }

    return WxRequest.get({url,data})
}

// 根据栏目获取搜索数据
export function getSearchList(res){
    const url = "index.php"
    const data = {
        m: "search",
        c: "indexsearch",
        classid: res.classid,
        keyword: res.keyword,
        page: res.page,
        limit: res.limit
    }

    return WxRequest.get({url, data})
}

// 根据栏目ID获取栏目筛选字段
export function getFieldList (res){
    const url = "index.php"
    const data = {
        m: "field",
        c: "fields",
        modid: res.modid,
        classid: res.classid
    }

    return WxRequest.get({url, data})
}

// 根据classid和字段获取分类页面内容列表
export function getConList (res){
    const url = "index.php"
    if (typeof(res.field) == "undefined"){
        res.field = {}
    }
    const data = {
        m: "field",
        c: "screen",
        modid: res.modid,
        classid: res.classid,
        page: res.page,
        limit: res.limit,
        field: JSON.stringify(res.field)
    }

    return WxRequest.get({url, data})

}

// 根据classid和字段获取picker页面的内容
export function getPickerList (res){
    const url = "index.php"
    if (typeof(res.field) == "undefined"){
        res.field = {}
    }
    const data = {
        m: "info",
        c: "class",
        modid: res.modid,
        classid: res.classid,
        gprice: res.gprice,
        field: JSON.stringify(res.field)
    }

    return WxRequest.get({url, data})

}

// 根据userid和type字段获取充值明细页面内容列表
export function getXfmxList (res){
    const url = "index.php"
    const data = {
        m: "user",
        c: "userinfo",
        userid:res.userid,
        type:"xfmx"
    }

    return WxRequest.get({url, data})

}

// 根据userid和type字段获取消费明细页面内容列表
export function getCzmxList (res){
    const url = "index.php"
    const data = {
        m: "user",
        c: "userinfo",
        userid:res.userid,
        type:"czmx"
    }

    return WxRequest.get({url, data})

}

// 根据userid和type字段获取行业选择列表
export function getIndustryList (res){
    const url = "index.php"
    const data = {
        m: "info",
        c: "class"
    }

    return WxRequest.get({url, data})

}

// 根据userid和type字段获取上传照片/二维码列表
export function getUpfileList (res){
    const url = "index.php"
    const data = {
        m: "upload",
        c: "image"
    }

    return WxRequest.get({url, data})

}







