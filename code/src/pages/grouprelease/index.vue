<template>
  <div>
    <div id="container-1">
      <div class="test">
        <div class="testNav">
          <div :class="{'bottom':tab === 0,'testTitle':true}" @click="changTab(0)">已通过</div>
          <div :class="{'bottom':tab === 1,'testTitle':true}" @click="changTab(1)">待审核</div>
          <div :class="{'bottom':tab === 2,'testTitle':true}" @click="changTab(2)">未通过</div>
        </div>
        <div class="container">
          <div v-if="tab===0">
            <!-- //数据栏 -->
            <div class="section">
              <scroll-view
                :scroll-y="true"
                :enable-back-to-top="true"
                style="height: 93%;background:#f0f0f0;"
                @scroll="scroll"
              >
                <div class="Wrap">
                  <div class="s-l" v-for="list in lists" :key="key">
                    <!-- <a
                      :href="'../../pages/detail/main?id=' + list.id + '&classid=' + list.classid+ '&type=' + list.type"
                    >-->
                    <div class="s-l-d">
                      <div class="s-l-d-p">
                        <img :src="list.titlepic" :alt="list.title">
                      </div>
                      <div class="s-l-d-i">
                        <div class="s-u-c-s">{{list.smsg}}</div>
                        <div class="s-l-i-t">{{list.title}}</div>
                        <div>微信号：{{list.weixin}}</div>
                        <div>地区：{{list.city}}</div>
                        <div>简介：{{list.smalltext}}</div>
                      </div>
                    </div>
                    <!-- </a> -->
                  </div>
                </div>
              </scroll-view>
            </div>
          </div>
          <div v-else-if="tab===1">
            <!-- //数据栏 -->
            <div class="section">
              <scroll-view
                :scroll-y="true"
                :enable-back-to-top="true"
                style="height: 93%;background:#f0f0f0;"
                @scroll="scroll"
              >
                <div class="Wrap">
                  <div class="s-l" v-for="list in lists1" :key="key">
                    <!-- <a
                      :href="'../../pages/detail/main?id=' + list.id + '&classid=' + list.classid+ '&type=' + list.type"
                    >-->
                    <div class="s-l-d">
                      <div class="s-l-d-p">
                        <img :src="list.titlepic" :alt="list.title">
                      </div>
                      <div class="s-l-d-i">
                        <div class="s-u-c-s">{{list.smsg}}</div>
                        <div class="s-l-i-t">{{list.title}}</div>
                        <div>微信号：{{list.weixin}}</div>
                        <div>地区：{{list.city}}</div>
                        <div>简介：{{list.smalltext}}</div>
                      </div>
                    </div>
                    <!-- </a> -->
                  </div>
                </div>
              </scroll-view>
            </div>
          </div>
          <div v-else>
            <!-- //数据栏 -->
            <div class="section">
              <scroll-view
                :scroll-y="true"
                :enable-back-to-top="true"
                style="height: 93%;background:#f0f0f0;"
                @scroll="scroll"
              >
                <div class="Wrap">
                  <div class="s-l" v-for="list in lists2" :key="key">
                    <!-- <a
                      :href="'../../pages/detail/main?id=' + list.id + '&classid=' + list.classid+ '&type=' + list.type"
                    >-->
                    <div class="s-l-d">
                      <div class="s-l-d-p">
                        <img :src="list.titlepic" :alt="list.title">
                      </div>
                      <div class="s-l-d-i">
                        <div class="s-u-c-s">{{list.smsg}}</div>
                        <div class="s-l-i-t">{{list.title}}</div>
                        <div>微信号：{{list.weixin}}</div>
                        <div>地区：{{list.city}}</div>
                        <div>简介：{{list.smalltext}}</div>
                      </div>
                    </div>
                    <!-- </a> -->
                    <!-- //未通过的原因 -->
                    <div class="res">原因:{{list.nocheckcause}}</div>
                  </div>
                </div>
              </scroll-view>
            </div>
          </div>
        </div>
      </div>

      <!-- //页面我要发布按钮 -->
      <div id="showbtn" @click="ShowBtn">
        <div class="img">
          <img src="../../static/img/btn11.png" alt>
        </div>我要发布
      </div>
    </div>
  </div>
</template>

<script>
import { getQuery } from "../../utils/function";
import { getConList } from "../../api/class.js";
import { $wuxToptips } from "../../../static/wux/index";

export default {
  data() {
    return {
      lists: [],
      lists1: [],
      lists2: [],
      scrollTop: 0,
      modid: 9,
      userid: "",
      bname: "",
      classid: 1,
      page: 1,
      limit: 10,
      field: {},
      tab: 0,
      checked: "index"
    };
  },
  mounted(data) {
    var that = this;
    var data = getQuery();

    this.getCon(data);

    var userId = wx.getStorageSync("userid");
    that.userid = userId;
    console.log(userId);

    var that = this;
    wx.request({
      url:
        "https://qq.zhongyi9999.com/e/extend/api/index.php?m=user&c=userinfo",
      data: {
        userid: userId,
        type: "fbjl",
        checked: "1",
        classid: 194
      },
      header: {
        "content-type": "application/json" // 默认值
      },
      success(data) {
        var hanyeList = data.data.data;
        console.log(hanyeList);

        that.lists = hanyeList;
      }
    });

    wx.request({
      url:
        "https://qq.zhongyi9999.com/e/extend/api/index.php?m=user&c=userinfo",
      data: {
        userid: userId,
        type: "fbjl",
        checked: "0",
        classid: 194
      },
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      success(data) {
        var hanyeList = data.data.data;
        console.log(hanyeList);

        that.lists1 = hanyeList;
      }
    });

    wx.request({
      url:
        "https://qq.zhongyi9999.com/e/extend/api/index.php?m=user&c=userinfo",
      data: {
        userid: userId,
        type: "fbjl",
        checked: "2",
        classid: 194
      },
      header: {
        "content-type": "application/json" // 默认值
      },
      success(data) {
        var hanyeList = data.data.data;
        console.log(hanyeList);

        that.lists2 = hanyeList;
      }
    });
        console.log(that.lists2);
  },
  onUnload: function() {
    wx.reLaunch({
      url: "../index/main"
    });
  },
  methods: {
    getCon(data) {
      data.page = this.page;
      data.limit = this.limit;
      getConList(data).then(res => {
        this.lists = res.data;
      });
    },
    setTitle() {
      wx.setNavigationBarTitle({
        title: this.bname
      });
    },
    scroll(e) {
      this.scrollTop = e.target.scrollTop;
    },
    loadMore(data) {
      getConList(data).then(res => {
        if (res.data != null && res.data.length != 0) {
          this.lists = this.lists.concat(res.data);
        } else {
          $wuxToptips().warn({
            hidden: true,
            text: "没有更多数据",
            duration: 2000,
            success() {}
          });
        }
      });
    },
    getSelectResult(e) {
      this.field = e;

      var data = {};
      data.modid = this.modid;
      data.classid = this.classid;
      data.page = 1;
      data.limit = this.limit;
      data.field = this.field;

      getConList(data).then(res => {
        if (res.data != null && res.data.length != 0) {
          this.lists = res.data;
        } else {
          this.lists = [];
          $wuxToptips().warn({
            hidden: true,
            text: "没有更多数据",
            duration: 2000,
            success() {}
          });
        }
      });
    },
    ShowBtn() {
      wx.navigateTo({
        url: "../../pages/choice/main"
      });
    },
    changTab(index) {
      this.tab = index;
      console.log(index);
    },
    watch: {
      scrollTop(curVal, oldVal) {
        if (this.scrollTop >= 560 * this.page) {
          this.page++;
          var data = {
            modid: this.modid,
            classid: this.classid,
            field: this.field,
            page: this.page,
            limit: this.limit
          };
          this.loadMore(data);
        }
      }
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

button {
  border: 0;
  background-color: transparent;
  outline: none;
}

#container-1 {
  background-color: #f7f7f7;
  background-size: 100% 100%;
  /* position: fix;
  height:100vh; */
  width: 100%;
  overflow: hidden;
}

#container-1 #showbtn {
  width: 130px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50px;
  font-size: 14px;
  color: #fff;
  position: fixed;
  right: 35%;
  bottom: 45px;
  z-index: 666;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #56b7fb, #389af5);
  box-shadow: 0 6px 3px #ecf5ff;
}

#showbtn .img {
  width: 15px;
  height: 15px;
  margin-top: -12px;
  margin-right: 5px;
}

.img img {
  width: 100%;
  height: 100%;
}

.pass {
  display: inline;
}

.bottom {
  /* width: 8px;
  height: 5px; */
  /* border-radius: 55px;
  background: rgb(4, 187, 243); */
  border-bottom: 2px solid #87caee;
  /* display: inline-block;  */
}

.test {
  width: 100%;
  background: #fff;
}

.testNav {
  padding: 0 20rpx;
  height: 40px;
  line-height: 40px;
  display: flex;
}

.testTitle {
  flex: 1;
  font-size: 15px;
  text-align: center;
}

.selected {
  color: #87caee;
  border-bottom: 1px solid #87caee;
}

#container-1 .section {
  width: 100%;
}

.Wrap {
  padding-top: -10px;
}

.s-l {
  width: 100%;
  padding: 10px 10px;
  margin-top: 10px;
  font-size: 28rpx;
  background-color: #fff;
}

.s-l-d {
  background-color: #fff;
  padding: 15rpx;
}
.s-l-d::after {
  display: block;
  height: 0;
  clear: both;
  content: "";
}
.s-l .res {
  width: 100%;
  height: 30px;
  line-height: 40px;
  color: #999999;
  border-top: 1px solid #ccc;
}
.s-l-d-p,
.s-l-d-p image {
  width: 150rpx;
  height: 150rpx;
}
.s-l-d-p image {
  border: 1rpx solid #f5f5f5;
  border-radius: 5rpx;
}
.s-l-d-i {
  width: 72%;
  margin-left: 15rpx;
  color: #999999;
  font-size: 25rpx;
}
.s-l-d-i > view {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 39rpx;
}
.s-l-d > view {
  float: left;
}
.s-l-i-t {
  color: #5e5e5e;
  font-size: 28rpx;
}
.s-u-c-s {
  float: right;
  font-size: 14px;
  color: rgb(4, 187, 243);
}
</style>


