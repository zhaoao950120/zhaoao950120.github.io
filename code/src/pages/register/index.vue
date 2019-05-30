<template>
  <div>
    <div class="container">
      <div class="section">
        <div class="section-1">
          <div class="top">
            <p>注册新账号，绑定微信账号，开通PC端快捷登录。</p>
          </div>

          <!-- <div class="phoneNumber action" :class="clickColor==0?'click-color':'default-color'"> -->
          <div class="phoneNumber action">
            <input type="number" placeholder="输入本人手机号" id="username" @blur="getusername">
          </div>

          <!-- <div class="smcode" :class="clickColor==1?'click-color':'default-color'"> -->
          <div class="smcode">
            <input type="number" placeholder="输入短信验证码" id="rzm" @blur="getrzmValue">
            <span class="smText" @click="getsmCode">获取短信验证码</span>
            <div classs="clear"></div>
          </div>

          <!-- <div class="possword" :class="clickColor==2?'click-color':'default-color'"> -->
          <div class="possword">
            <input type="password" placeholder="输入密码" id="password" @blur="getpassword">
          </div>

          <!-- <div class="R-possword" :class="clickColor==3?'click-color':'default-color'"> -->
          <div class="R-possword">
            <input type="password" placeholder="再次输入密码" id="repassword" @blur="getrepassword">
          </div>

          <button class="btn" @click="register">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUsername, getsmCode } from "../../api/user.js";

export default {
  data() {
    return {
      username: "",
      smcode: "",
      iscode: null, //用于存放验证码接口里获取到的code
      password: "",
      repassword: "",
      focus: true,
      enews: "Rzsj",
      clickColor: 0
    };
  },
  methods: {
    //获取input输入的值
    getusername(e) {
      this.username = e.mp.detail.value;
    },
    getrzmValue(e) {
      this.rzm = e.mp.detail.value;
    },
    getpassword(e) {
      this.password = e.mp.detail.value;
    },
    getrepassword(e) {
      this.repassword = e.mp.detail.value;
    },
    getsmCode() {
      console.log(this.username);
      var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
      if (this.username == "") {
        wx.showToast({
          title: "手机号不能为空",
          icon: "none",
          duration: 1000
        });
        return false;
      } else if (!myreg.test(this.username)) {
        wx.showToast({
          title: "请输入正确的手机号",
          icon: "none",
          duration: 1000
        });
        return false;
      } else {
        wx.request({
          data: {
            username: this.username,
            enews: "Rzsj"
          },
          url:
            "https://qq.zhongyi9999.com/e/extend/api/index.php?m=user&c=register",
          success: res => {
            console.log(res.data);
            wx.setStorageSync("gzwrz", res.data.data.key);
            setTimeout(() => {
              iscode: res.data;
            }, 1000);

            var num = 61;
            var timer = setInterval(function() {
              num--;
              if (num <= 0) {
                clearInterval(timer);
                setTimeout(() => {
                  codename: "重新发送";
                  disabled: false;
                }, 1000);
              } else {
                setTimeout(() => {
                  codename: num + "s";
                });
              }
            }, 1000);
          }
        });
      }
    },
    register() {
      var _this = this;
      var unionId = wx.getStorageSync("unionId");
      console.log(wx.getStorageSync("gzwrz"));
      if (
        _this.username == "" ||
        _this.password == "" ||
        _this.repassword == "" ||
        _this.rzm == ""
      ) {
        wx.showToast({
          title: "请核对",
          icon: "loading",
          duration: 1000
        });
      } else {
        var that = this;
        let data = {
          username: _this.username,
          password: _this.password,
          repassword: _this.repassword,
          rzm: _this.rzm,
          unionid: unionId
        };
        wx.request({
          url:
            "https://qq.zhongyi9999.com/e/extend/api/index.php?m=user&c=register",
          header: {
            "content-type": "application/x-www-form-urlencoded",
            cookie: "gzwrz=" + wx.getStorageSync("gzwrz")
          },
          data: data,
          method: "POST",
          success: function(res) {

            var userid = res.data.data.userid;
            that.userid = userid;

            var userid = wx.setStorageSync("userid", that.userid);
            if (res.data.status == 1) {
              wx.navigateTo({
                url: "../../pages/mine/main?userid=userid"
              });
            }
          }
        });
      }
    }
  }
};
</script>

<style scope>
input {
  background: none;
  outline: none;
  border: 0px;
}

.clear {
  clear: both;
}

.container {
  width: 100%;
  height: 100%;
}

.section {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-1 {
  width: 90%;
  height: 100%;
}

.section-1 .top {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 15px;
  color: #808080;
}

.section-1 .phoneNumber,
.section-1 .smcode,
.section-1 .possword,
.section-1 .R-possword {
  width: 100%;
  height: 50px;
  margin-top: 15px;
  border: 1px solid #ccc;
  border-radius: 50px;
}

.section-1 .smcode input {
  width: 40%;
  height: 40px;
  margin-left: 45px;
  margin-top: 5px;
  font-size: 18px;
  float: left;
  color: #000;
}

.section-1 .smcode .smText {
  width: 40%;
  height: 50px;
  line-height: 50px;
  text-align: right;
  /* margin-top: 6px; */
  font-size: 15px;
  float: left;
  color: #389af5;
  display: inline-block;
}

.section-1 .phoneNumber input,
.section-1 .possword input,
.section-1 .R-possword input {
  width: 80%;
  height: 50px;
  margin-left: 45px;
  /* margin-top: 6px; */
  font-size: 18px;
}

.section-1 .btn {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #56b7fb;
  margin-top: 20px;
  font-size: 18px;
  color: #fff;
  border-radius: 50px;
}

.action {
  margin-top: 0px !important;
}

.click-color {
  border: 1px solid #19b3ed !important;
}

.default-color {
  border: 1px solid #ccc !important;
}
</style>
