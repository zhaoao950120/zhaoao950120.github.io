<template>
  <div class="container">
    <wux-toptips id="wux-toptips"/>
    <div class="mask" v-if="show"></div>
    <div id="alertbox" @click="showList" v-if="show">
      <div id="alert-img">
        <g @click="close"></g>
        <img :src="infos.ewm" :alt="infos.title">
        <p>扫一扫上面的二维码，加我微信</p>
        <p>保存到相册后再进行扫码</p>
        <button class="saveimg" @click="saveimg">保存到相册</button>
      </div>
    </div>
    <div class="detail">
      <div class="imgbox">
        <span v-if="infos.type">{{infos.type}}</span>
        <img :src="infos.titlepic">
      </div>
      <div class="titlebox">
        <p>{{infos.title}}</p>
        <div>
          <span>地区：{{infos.city}}</span>
          <g>|</g>
          <span>行业：{{infos.industry}}</span>
          <g v-if="infos.total">|</g>
          <span v-if="infos.total">人数：{{infos.total}}人</span>
          <g v-if="infos.gprice">|</g>
          <span v-if="infos.gprice">价格：{{infos.gprice}}元</span>
        </div>
      </div>
      <div class="description">
        <p>{{infos.smalltext}}</p>
      </div>
    </div>
    <div class="line">
      <div class="fl">
        <img src="../../../static/img/wechat.png">
        <span>微信号：{{infos.weixin}}</span>
      </div>
      <div class="fr">
        <button class="addwx" @click="showimg">立即添加</button>
      </div>
    </div>
  </div>
</template>

<script>
import { $wuxToptips } from "../../../static/wux/index";
import { getQuery } from "@/utils/function";
import { getDetail } from "@/api/detail";
export default {
  data() {
    return {
      show: false,
      infos: {},
      bname:''
    };
  },
  created() {},
  mounted() {
    var param = getQuery();
    //  console.log(param);
    // var param = { id: 9754, classid: 194 };
    this._getDetail(param);
  },
  methods: {
    _getDetail(param) {
      getDetail(param).then((res) => {
        this.infos = res.data
        this.bname = res.info.bname+'详情'
        this.setTitle()
      });
    },
    setTitle(){
      wx.setNavigationBarTitle({
        title: this.bname 
      })
    },
    showimg() {
      this.show = !this.show;
    },
    close() {
      this.show = false;
    },
    saveimg() {
      this.close();
      var that = this;
      var imgSrc = this.infos.ewm;
      wx.downloadFile({
        url: imgSrc,
        success: function(res) {
          //图片保存到本地
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function(data) {
              wx.showToast({
                title: "保存成功",
                icon: "success",
                duration: 2000
              });
            },
            fail: function(err) {
              if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                wx.getSetting({
                  success(res) {
                    if (!res.authSetting["scope.writePhotosAlbum"]) {
                      console.log(res);
                      that.openConfirm();
                    }
                  }
                });
              }
            }
          });
        }
      });
    },
    openConfirm: function(){
      wx.showModal({
        content: "检测到您保存相册图片，是否去设置打开？",
        confirmText: "确认",
        cancelText: "取消",
        success: function(res) {
          console.log(res);
          //点击“确认”时打开设置页面
          if (res.confirm) {
            wx.openSetting({
              success: res => {
                $wuxToptips().success({
                  hidden: true,
                  text: "获取权限成功，请再次点击按钮保存到相册",
                  duration: 2000,
                  success() {}
                });
              }
            });
          } else {
            $wuxToptips().info({
              hidden: true,
              text: "授权已取消",
              duration: 2000,
              success() {}
            });
          }
        }
      });
    }
  }
};
</script>

<style>
page {
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  font-family: "MicrosoftYaHei", "Helvetica Neue", Helvetica, "PingFang SC",
    Tahoma, Arial, sans-serif;
  font-size: 24rpx;
  color: #484848;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.detail {
  background: #fff;
  margin-bottom: 10rpx;
}
.imgbox {
  text-align: center;
  padding: 30rpx 0;
  background: #fff;
  position: relative;
}
.imgbox span {
  background-color: #000000;
  border-radius: 0 30rpx 30rpx 0;
  opacity: 0.5;
  color: #fff;
  font-size: 22rpx;
  position: absolute;
  left: 0;
  padding: 10rpx 30rpx;
  top: 40rpx;
}
.imgbox img {
  width: 370rpx;
  height: 370rpx;
  padding: 30rpx;
}
.titlebox {
  padding: 0 30rpx;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  line-height: 40rpx;
}
.titlebox p {
  font-size: 30rpx;
}
.titlebox div {
  color: #808080;
  padding-bottom: 20rpx;
}
.titlebox div > g {
  padding: 0 20rpx;
  color: #ccc;
}
.description {
  padding: 20rpx 30rpx;
}
.description p {
  color: #808080;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  /* max-height: 150rpx; */
}

.line {
  background: #fff;
  padding: 25rpx 30rpx;
  overflow: hidden;
  clear: both;
}
.line div > img {
  width: 52rpx;
  height: 52rpx;
  vertical-align: middle;
  margin-right: 20rpx;
}
.line .addwx {
  display: inline-block;
  border-radius: 25rpx !important;
  background-color: #28b9ef !important;
  font-size: 20rpx !important;
  color: #fff !important;
  margin-top: 5rpx;
}

#alertbox {
  position: fixed;
  z-index: 1000;
  width: 474rpx;
  height: 647rpx;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10rpx;
}
.mask {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
#alert-img {
  position: relative;
  border: 0;
  background-clip: padding-box;
  text-align: center;
  overflow: hidden;
}
#alert-img g {
  background: url("../../../static/img/close.png") no-repeat;
  background-size: cover;
  width: 27rpx;
  height: 27rpx;
  position: absolute;
  z-index: 15;
  right: 20rpx;
  top: 20rpx;
}
#alert-img img {
  width: 300rpx;
  height: 300rpx;
  margin-top: 70rpx;
  margin-bottom: 20rpx;
}
#alert-img p {
  line-height: 60rpx;
  color: #808080;
  font-size: 22rpx;
}
.saveimg {
  display: inline-block;
  width: 300rpx;
  border-radius: 30rpx !important;
  background-color: #28b9ef !important;
  font-size: 22rpx !important;
  color: #fff !important;
  margin: 20rpx 0;
  padding: 6rpx 0;
}
</style>


