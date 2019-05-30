<template lang="html">
    <div class="container">
        <scroll-view :scroll-y="true" :scroll-top="scrollTop" :enable-back-to-top="true" style="width:100%;height: 93%;overflow:scroll;" upper-threshold="-20" @scroll="scroll">
          <!-- 分栏按钮 -->
            <div class="button-box">
                <class-button />
            </div>
            <!-- 筛选按钮 -->
            <div>
                <vSelect :data="select" align="center" fix  @change="getSelectResult($event)"></vSelect>
            </div>
            <!-- 数据渲染区域 -->
            <div class="s-l" v-for="list in lists" :key="key">
                <a :href="'../../pages/detail/main?id=' + list.id + '&classid=' + list.classid">
                    <div class="s-l-d">
                        <div class="s-l-d-p"><img :src="list.titlepic" :alt="list.title"></div>
                        <div class="s-l-d-i">
                            <div class="s-l-i-t">{{list.title}}</div>
                            <div>微信号：{{list.weixin}}</div>
                            <div>地区：{{list.city}}</div>
                            <div>简介：{{list.smalltext}}</div>
                        </div>
                    </div>
                </a>
            </div>
        </scroll-view>
        <tip ref="child"></tip>
        <!-- 底部footer -->
        <NavBottom />
        <wux-toptips id="wux-toptips" />
        <!-- //悬浮的发布圆球 -->
        <div id="tips-1" ref="tip" @click="MakeShow" ></div>
    </div>
</template>

<script>
import ClassButton from "../../components/classButton";
import tip from "../../components/tip";
import NavBottom from "../../components/nav2";
import { getQuery } from "../../utils/function";
import { getFieldList, getConList } from "../../api/class.js";
import vSelect from "../../components/vSelect";
// import Login from "../../components/login"
import { $wuxToptips } from "../../../static/wux/index";

export default {
  components: { ClassButton, vSelect, NavBottom, tip },
  data() {
    return {
      select: [
        {
          label: "人数",
          field: "total",
          option: [{ name: "0-10", value: "0-10" }]
        },
        {
          label: "\u6807\u7b7e",
          field: "type",
          option: [{ name: "\u6280\u672f\u63a2\u8ba8", value: "1" }]
        },
        //行业
        {
          label: "\u884c\u4e1a\u5206\u7c7b",
          field: "industry",
          option: [{ name: "\u80a1\u7968", value: "1" }]
        },
        {
          label: "\u5730\u533a",
          field: "city",
          option: [{ name: "\u5317\u4eac\u5e02", value: "2" }]
        }
      ],
      lists: [],
      scrollTop: 0,
      modid: 9,
      bname: "",
      classid: 1, //分类栏
      page: 1,
      limit: 10, //每页显示数据
      field: {}
    };
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data());
  },
  created() {
    console.log(666);
  },
  mounted() {
    wx.showShareMenu({
      withShareTicket: true
    });

    var data = getQuery();
    // console.log("栏目筛选传入的数据", data);
    // 根据栏目ID获取栏目筛选字段
    this.getField(data);

    // 根据classid和字段获取分类页面内容列表
    this.getCon(data);

    this.modid = data.modid;
    this.classid = data.classid;
    //   this.$forceUpdate();
  },
  onUnload: function() {
    wx.reLaunch({
      url: "../index/main"
    });
  },
  methods: {
    //悬浮的发布圆球
    MakeShow() {
      var unionId = wx.getStorageSync("unionId");
      console.log(unionId);
      if (unionId) {
        wx.navigateTo({
          url: "../../pages/choice/main"
        });
      } else {
        this.$refs.child.registerAn1();
      }
    },

    // 根据栏目ID获取栏目筛选字段
    getField(data) {
      getFieldList(data).then(res => {
        console.log("栏目筛选字段", res.data);
        this.select = res.data;
        for (var i = 0; i < this.select.length; i++) {
          this.select[i].option.unshift({ name: "全选", value: "-1" });
        }
        console.log("当前栏目名", res.info.classname);
        this.bname = res.info.classname;
        this.setTitle();
      });
    },

    // 根据classid和字段获取分类页面内容列表
    getCon(data) {
      data.page = this.page;
      data.limit = this.limit;
      getConList(data).then(res => {
        this.lists = res.data;
      });
    },

    // 设置当前页面的标题
    setTitle() {
      wx.setNavigationBarTitle({
        title: this.bname
      });
    },

    // 滚轮滑动事件
    scroll(e) {
      this.scrollTop = e.target.scrollTop;
      var that = this;
      var index = this.scrollTop;
      wx.getSystemInfo({
        success(res) {
          if (res.platform == "android") {
            console.log("用户使用的是安卓手机");
            var bottom = "moivecontent[" + index + "].bottom";
            that.setData({
              [bottom]: 20
            });
          }
        }
      });
    },

    // 滚动时动态获取数据
    loadMore(data) {
      getConList(data).then(res => {
        console.log("res" + res);
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

    // 获取筛选的数据
    getSelectResult(e) {
      console.log(e);

      this.field = e;
      var that = this;
      var data = {};
      data.modid = that.modid;
      data.classid = that.classid;
      data.page = 1;
      data.limit = that.limit;
      data.field = that.field;
      if (e.industry == -1) {
        data.field = {};
        console.log(11111);
      }
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
    }
  },
  // 侦听滚轮下滑获取数据
  watch: {
    scrollTop(curVal, oldVal) {
      // console.log(this.modid, this.classid, this.field, this.page, this.limit);
      if (this.scrollTop >= 560 * this.page) {
        console.log("gunlun");
        this.page++;
        var data = {
          modid: this.modid,
          classid: this.classid,
          field: this.field,
          page: this.page,
          limit: this.limit
        };
        if (data.field) {
          data.field = {};
        }
        this.loadMore(data);
      }
      console.log(this.scrollTop);
      console.log(this.page);
    }
  }
};
</script>

<style lang="css" scoped>
.container {
  background-color: #f7f7f7;
  background-size: 100% 100%;
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 555;
}

.container #tips-1 {
  width: 35px;
  height: 35px;
  border-radius: 50px;
  background: url(../../static/img/ran1.png) -3px 0 no-repeat;
  position: fixed;
  right: 20px;
  bottom: 58px;
  background-size: 120%;
  z-index: 666;
}
.button-box {
  background: #fff;
  margin: 0;
  margin-bottom: 20rpx;
}
.s-l {
  margin: 20rpx 40rpx;
  font-size: 28rpx;
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
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>

