import WxRequest from '../utils/wx-request'

// 获取openid
export function getOpenid(res){
    const url = 'index.php'
    const data = {
        m: 'user',
        c: 'getsession',
        code:JSON.stringify(res.code)
    }

    return WxRequest.get({url,data})
}

//注册验证码验证
export function getUsername(res){
    const url = 'index.php'
    const data = {
        m: 'user',
        c: 'getsession',
        username:res.username,
        password:res.password,
        rzm:res.rzm,
        repassword:res.repassword,
        unionId:res.unionId
    }

    return WxRequest.get({url,data})
}

//发送验证码
export function getsmCode(res){
    const url = 'index.php'
    const data = {
        m: 'user',
        c: 'getsession',
        username:res.username,
        enews:'Rzsj'
    }

    return WxRequest.get({url,data})
}

//绑定账号
export function bindAn(res){
    const url = 'index.php'
    const data = {
        m: 'user',
        c: 'getsession',
        username:res.username,
        password:res.password
    }

    return WxRequest.get({url,data})
}

//验证账号是否关联
export function isbindAn(res){ 
    const url = 'index.php'
    const data = {
        m: 'user',
        c: 'isbind',
        unionId:res.unionId
    }

    return WxRequest.get({url,data})
}