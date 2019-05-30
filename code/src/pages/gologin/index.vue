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
  components: { NavBottom, Login },
  data() {
    return {
      unionId: "",
      bl: false,
      userId: "",
      userFen: ""
    };
  },
  methods: {
    onGotUserInfo() {
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
    isbindAn(unionId) {
      //   console.log(unionId);
      var that = this;
      var userid = wx.getStorageSync("userid");
      that.userId = userid;
      console.log(userid);
      wx.request({
        url:
          "https://qq.zhongyi9999.com/e/extend/api/index.php?m=user&c=isbind",
        method: "post",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          unionid: unionId,
          apptype: "weixin"
        },
        success: function(data, bl, res) {
          if (data.data.status == 0) {
            console.log("账号未绑定");
            that.bl = true;
            console.log(that.unionId);
          } else {
            var userid = data.data.data.userid;
            var userfen = data.data.data.userfen;
            that.userId = userid;
            that.userFen = userfen;
            wx.setStorageSync("userid", that.userId);
            wx.setStorageSync("userfen", that.userFen);
            that.bl = false;
            wx.navigateTo({
              url: "../../pages/mine/main"
            });
          }
        }
      });
    },
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
                      console.log(userInfo_);
                      that.unionId = userInfo_.unionId;
                      wx.setStorageSync("unionId", that.unionId);
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
  border-radius: 25px;
}
</style>