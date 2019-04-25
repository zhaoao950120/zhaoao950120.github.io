<template>
  <div>
    <div class="Wrap-1">
      <div class="m1">
        <button class="btn" open-type="getUserInfo" lang="zh_CN" @click="onGotUserInfo">去登陆</button>
      </div>
      <nav-bottom></nav-bottom>
      <login v-if="bl"></login>
    </div>
  </div>
</template>

<script>
//导入组件
import NavBottom from "@/components/nav3";
import { isbindAn } from "../../api/user.js";
import { setTimeout } from "timers";
import Login from "@/components/login";

export default {
  components: { NavBottom,Login },
  data() {
    return {
      unionId: "",
      bl:false,
      userId:''
    };
  },
  methods: {
    onGotUserInfo() {
      //获取用户登陆状态
      wx.getSetting({
        success: res => {
          if (res.authSetting["scope.userInfo"]) {
            this.getOpenid();
          }
        },
        fail: res => {
          console.log("获取用户登录态失败" + res.errMsg);
        }
      });
    },
    //检查用户的账号是否关联
    isbindAn(unionId) {
    //   console.log(unionId);
      var that = this;
      var userid = wx.getStorageSync('userid')
      that.userId = userid
      console.log(userid)
      wx.request({
        url:"https://qq.zhongyi9999.com/e/extend/api/index.php?m=user&c=isbind",
        method: "post",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          unionId: unionId,
          apptype:'weixin'
        },
        success: function(data,bl) {
            if(data.data.status == 0){
                console.log("账号未绑定");
                that.bl = true;
                console.log(that.unionId);
                //跳转到我的页面
                // wx.navigateTo({
                //     url: '../../pages/mine/main'
                // })
            }else{
                that.bl = false;
                wx.navigateTo({
                    url: '../../pages/mine/main'
                })
            }
        }
      });
    },
    //获取用户unionid
    getOpenid() {
      var that = this;
      wx.login({
        success: function(res) {
          var code = res.code; //登录凭证
          if (code) {
            wx.getUserInfo({
              success: function(res) {
                wx.request({
                  url:
                    "https://qq.zhongyi9999.com/e/extend/api/index.php?m=user&c=getsession",
                  method: "get",
                  header: {
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  data: {
                    encryptedData: res.encryptedData,
                    iv: res.iv,
                    code: code
                  },
                  success: function(data) {
                    if (data.data.status == 1) {
                      var userInfo_ = data.data.data;
                      // this.userInfo = userInfo_
                      console.log(userInfo_);
                      // this.globalData.userInfo = userInfo_
                      // console.log(this.globalData.userInfo.openid)
                      that.unionId = userInfo_.unionId;
                      //   console.log(that.unionId);
                      wx.setStorageSync("unionId",that.unionId);
                      that.isbindAn(that.unionId);
                     
                    } else {
                      console.log("解密失败");
                    }
                  }
                });
              },
              fail: function() {
                console.log("获取用户信息失败");
              }
            });
          }
        },
        fail: function() {
          console.log("获取code失败");
        }
      });
    }
  }
};
</script>

<style scope>
.Wrap-1 {
  width: 100%;
  height: 100%;
}
.m1 {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
button {
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.m1 .btn {
  width: 70%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  color: #fff;
  font-size: 16px;
  background: linear-gradient(to right, #56b7fb, #389af5);
  background-size: 100% 100%;
  border-radius: 15px;
}
</style>


