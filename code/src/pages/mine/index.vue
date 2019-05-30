<template>
  <div>
    <div id="container-1">
      <div id="container">
        <img :src="imgUrl">
        <div class="Wrap">
          <div class="left">
            <button class="btn" open-type="getUserInfo">
              <open-data type="userAvatarUrl" class="userinfo" id="userinfo"></open-data>
            </button>
          </div>
          <div class="midder">
            <p class="User01">
              <open-data type="userNickName"></open-data>
              (#{{userid}})
            </p>
            <p>
              余额:
              <span>{{userfen}}</span>元
            </p>
          </div>
          <div class="right">
            <div class="pag" @click="openRegister">
              <img src="/static/img/pag.png" alt class="smallpag">
              <p class="money">钱包</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section1">
        <div class="mysection">我的发布</div>
        <img :src="imgUrl1">
      </div>
      <!-- //我的发布 -->
      <div class="midder-section">
        <midder-bottom></midder-bottom>
      </div>
      <div class="midder-section-1">
        <div class="midder-section2">
          <div class="midder-section3">
            <div class="midder-section4 active">
              <img src="/static/img/fk.png" alt>
              <p>我要反馈</p>
            </div>
            <div class="midder-section5">
              <img src="/static/img/about.png" alt>
              <p>关于财圈</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <nav-bottom></nav-bottom>
      <wux-toptips id="wux-toptips"/>
    </div>
    <login></login>
    <tip></tip>
  </div>
</template>

<script>
// 导入组件
import ClassBottom from "@/components/classButton";
import NavBottom from "../../components/nav3";
import MidderBottom from "@/components/midderButton";
// import Login from "@/components/login";
import tip from "@/components/tip";
import imgUrl from "../../static/img/top.png";
import imgUrl1 from "../../static/img/ran.png";
import { $wuxToptips } from "../../../static/wux/index";
import { getOpenid } from "../../api/user.js";
import { getQuery } from "../../utils/function";

export default {
  components: { ClassBottom, NavBottom, MidderBottom, tip },
  data() {
    return {
      imgUrl,
      imgUrl1,
      userid: "",
      userfen: ""
      // userInfo:{}
    };
  },
  onLoad: function() {
    var that = this;
    var userid = wx.getStorageSync("userid");
    var userfen = wx.getStorageSync("userfen");
    var userfen = wx.getStorageSync("userfen");
    console.log(userid);
    console.log(userfen);
    that.userid = userid;
    that.userfen = userfen;
    wx.getSetting({
      success: function(res) {
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo);
            }
          });
        }
      }
    });
  },
  methods: {
    openRegister() {
      wx.navigateTo({
        url: "../../pages/purse/main"
      });
    }
  }
};
</script>

<style lang="wxss">
* {
  margin: 0;
  padding: 0;
}

page {
  background-color: #f7f7f7 !important;
}

body {
  background-color: #f7f7f7;
}

button {
  border: 0;
  background-color: transparent;
  outline: none;
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
  width: 90%;
  height: 100%;
}

.Wrap .left {
  width: 23%;
  height: 330rpx;
  float: left;
}

.Wrap .btn {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-top: 30px;
  background: url(../../static/img/tx.png) 0 0 no-repeat;
  background-size: 100%;
}

.btn #userinfo {
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  display: flex;
  overflow: hidden;
  text-align: center;
  margin-left: -13px;
}

.Wrap .midder {
  width: 31%;
  height: 330rpx;
  line-height: 45rpx;
  float: left;
  display: flex;
  font-size: 24rpx;
  color: white;
  flex-direction: column;
}

.Wrap .midder .User01 {
  margin-top: 90rpx;
}

.Wrap .right {
  width: 43%;
  height: 330rpx;
  float: left;
}

.right .pag {
  width: 151rpx;
  height: 64rpx;
  float: right;
  border-radius: 100rpx;
  background: #fff;
  margin-top: 100rpx;
  box-shadow: 7rpx 3rpx 2rpx #2894ff;
}

.pag .smallpag {
  width: 23%;
  height: 20px;
  float: left;
  margin-left: 30rpx;
  margin-top: 11rpx;
}

.pag .money {
  font-size: 30rpx;
  float: left;
  margin-left: 9rpx;
  margin-top: 15rpx;
  color: #04bbf2;
}

.section {
  width: 100%;
  height: 100%;
  background: #ccc;
  border: 2rpx solid #f8f8ff;
}

.section .section1 {
  width: 100%;
  height: 70rpx;
  margin-top: -2rpx;
  background: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.section1 .mysection {
  width: 40%;
  height: 70rpx;
  line-height: 70rpx;
  text-align: center;
  font-size: 36rpx;
  color: #5992ff;
  background: url(../../static/img/ran.png) 0 15rpx no-repeat;
  background-size: 100%;
  margin-top: 10px;
}

.section .midder-section {
  width: 100%;
  height: 230rpx;
  margin-top: -2rpx;
  background: #fff;
}

.section .midder-section-1 {
  width: 100%;
  height: 220rpx;
  background: #f7f7f7;
  padding-top: 15px;
}

.section .midder-section2 {
  width: 100%;
  height: 200rpx;
  background: #fff;
  display: flex;
  justify-content: center;
}

.section .midder-section3 {
  width: 90%;
  height: 200rpx;
}

.section .midder-section4,
.section .midder-section5 {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  font-size: 32rpx;
}

.midder-section4 img,
.midder-section5 img {
  width: 6%;
  height: 20px;
  margin-top: 28rpx;
  float: left;
}

.midder-section5 img {
  margin-top: 31rpx;
}

.midder-section4 p,
.midder-section5 p {
  float: left;
  margin-left: 10rpx;
}

.active {
  border-bottom: 2rpx solid #f0f0f0;
}

.footer {
  width: 100%;
  height: 92rpx;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>


