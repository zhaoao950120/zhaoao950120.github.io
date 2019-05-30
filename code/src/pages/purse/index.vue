<template>
  <div>
    <div id="container-1">
      <div id="container">
        <div class="Wrap">
          <p class="cash">{{ userfen }}</p>
          <p class="cash1">余额 (元)</p>
        </div>
      </div>
      <div class="Wrap-1">
        <div class="W-1">
          <div class="left" @click="recd">
            <span>消费明细</span>
          </div>
          <div class="right" @click="cond">
            <span>充值明细</span>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-1">
        <div class="s-1">
          <p>充值金额</p>
        </div>
        <div class="s-2">
          <ul>
            <li
              v-for="(id,index) in item"
              :key="index"
              :class="{'bgStyle':index==currentIndex}"
              @click="change(id.id,index)"
            >{{ id.gname }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer">
      <p class="tip">温馨提示:</p>
      <p class="tip1">
        充值成功后，到帐可能会有一定的延迟,
        <br>请耐心等待
      </p>
    </div>
    <div class="btn-1">
      <button class="btn" @click="Sure">确认充值</button>
    </div>
  </div>
</template>

<script>
// 导入组件
export default {
  data() {
    return {
      cash: "",
      item: [],
      userfen: "",
      openid: "",
      userid: "",
      id: "",
      currentIndex: ""
    };
  },
  mounted(data) {
    var that = this;
    var userid = wx.getStorageSync("userid");
    console.log(userid);
    that.userid = userid;

    this.getCzm(userid);
  },
  methods: {
    getCzm(userid) {
      var that = this;
      wx.request({
        url:
          "https://qq.zhongyi9999.com/e/extend/api/index.php?m=user&c=amount&userid=userid",
        data: {
          userfen: "",
          userid: userid
        },
        header: {
          "content-type": "application/json" // 默认值
        },
        success(data) {
          var hanyeList = data.data;
          var itemArray = hanyeList.data.amount;

          var userfen = hanyeList.data.userfen;
          console.log(userfen);
          that.userfen = userfen;
          var userfen1 = wx.setStorageSync("userfen", that.userfen);
          console.log(wx.getStorageSync("userfen"));

          if (that.item.length == 0) {
            for (var i = 0; i < itemArray.length; i++) {
              var obj = new Object();
              obj.id = itemArray[i].id;
              obj.gname = itemArray[i].gname;
              that.item.push(obj);
            }
          }
        }
      });
    },
    cond() {
      wx.navigateTo({
        url: "../../pages/cond/main"
      });
    },
    recd() {
      wx.navigateTo({
        url: "../../pages/recd/main"
      });
    },
    cash(e) {
      console.log((this.getCash = this.cash.toUpperCase()));
    },
    change(id, index) {
      this.id = id;
      this.currentIndex = index;
      console.log(id);
    },
    Sure(res) {
      var that = this;
      var id = that.id;
      var userid = wx.getStorageSync("userid");
      // console.log(userid);
      that.userid = userid;
      wx.login({
        success: function(res) {
          var code = res.code; //登录凭证
          if (res) {
            wx.request({
              url:
                "https://qq.zhongyi9999.com/e/extend/api/index.php?m=user&c=zypay",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                code: code,
                id: id,
                userid: userid,
                username: 13016439455
              },
              method: "post",
              success: function(res) {
                console.log(res.data);
                var resp = res.data;
                // 发起支付
                if (resp.status == 1) {
                  wx.requestPayment({
                    appId: resp.data.appId,
                    timeStamp: resp.data.timeStamp,
                    nonceStr: resp.data.nonceStr,
                    package: resp.data.package,
                    signType: "HMAC-SHA256",
                    paySign: resp.data.paySign,
                    success(data) {
                      console.log(data);
                    },
                    fail(data) {
                      console.log(data);
                    },
                    complete(data) {
                      console.log(data);
                    }
                  });
                } else {
                  console.log(resp.msg);
                }
              },
              fail: function(res) {
                console.log(res);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style scope>
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #f7f7f7;
}

button {
  border: 0;
  background-color: transparent;
  outline: none;
}

input {
  background: none;
  outline: none;
  border: 0px;
}

#container-1 {
  background: #fff;
  overflow: hidden;
}

#container {
  width: 100%;
  height: 330rpx;
  /* background-image:url("http://www.zhongyi9999.com/public/img/user_bg.png") 0px 0px no-peat; */
  background: url(../../static/img/top.png) 0 -2rpx no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

#container .Wrap {
  width: 40%;
  height: 40%;
  line-height: 37px;
  display: flex;
  color: #fff;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.Wrap .cash {
  font-size: 27px;
  font-weight: 600;
}

.Wrap .cash1 {
  font-size: 14px;
}

#container-1 .Wrap-1 {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.Wrap-1 .W-1 {
  width: 90%;
  height: 30px;
}

.W-1 .left {
  width: 54%;
  height: 100%;
  line-height: 30px;
  float: left;
  text-align: center;
  font-size: 14px;
  background: url(../../static/img/smallleft1.png) 85rpx 8rpx no-repeat;
  background-size: 9%;
}

.W-1 .right {
  width: 46%;
  height: 100%;
  float: left;
  line-height: 30px;
  font-size: 14px;
  text-align: center;
  background: url(../../static/img/smallright1.png) 55rpx 11rpx no-repeat;
  background-size: 13%;
}

.section {
  width: 100%;
  height: 140px;
  background: #fff;
  margin-top: 15px;
}

.section .section-1 {
  width: 100%;
  height: 134px;
  /* border-bottom: 1px solid #ccc; */
}

.section-1 .s-1 {
  width: 100%;
  height: 30px;
  line-height: 45px;
  text-align: center;
  color: #5e96ff;
  font-size: 15px;
  background: url(../../static/img/ran.png) 265rpx 37rpx no-repeat;
  background-size: 30%;
}

.section-1 .s-2 {
  width: 100%;
  height: 50px;
  /* margin-top: 10px; */
}

.s-2 li {
  width: 70px;
  height: 30px;
  line-height: 30px;
  float: left;
  font-size: 16px;
  text-align: center;
  margin-left: 18px;
  margin-top: 18px;
  border-radius: 5px;
  border: 1px solid#ccc;
  background: #f8f8f8;
}

.section .section-2 {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
}

.section-2 .list {
  width: 24%;
  height: 50px;
  line-height: 50px;
  float: left;
  font-size: 17px;
  padding-left: 17px;
}

.section-2 input {
  width: 65%;
  height: 50px;
  line-height: 50px;
  float: left;
  font-size: 17px;
}

.footer {
  width: 100%;
  height: 80px;
}

.tip {
  width: 19%;
  height: 80px;
  line-height: 50px;
  float: left;
  color: #808080;
  font-size: 14px;
  padding-left: 17px;
}

.tip1 {
  width: 65%;
  height: 80px;
  float: left;
  color: #808080;
  line-height: 20px;
  font-size: 14px;
  padding-top: 16px;
}

.btn-1 {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 20px;
  margin: 0 auto;
}

.btn {
  width: 90%;
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-weight: 600;
  background: #0095e5;
  border-radius: 50px;
}
.bgStyle {
  background: #0095e5 !important;
  color: #fff;
}
</style>