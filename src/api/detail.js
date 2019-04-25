/**
 * Created by xiaoqiang on 12/11/2018.
 */
import WxRequest from '../utils/wx-request'

// 获取内容详情
export function getDetail (param){
    const url = 'index.php';
    const data = {
      m:'info',
      c:'view',
      id:param.id,
      classid:param.classid
    }

    return WxRequest.get({url,data})
}

