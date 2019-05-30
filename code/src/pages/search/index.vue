<template>
  <div class="container">
    <scroll-view :scroll-y="true" :enable-back-to-top="true" style="height: 100%;" @scroll="scroll">
      <search/>
      <div class="s-r-i">
        搜索关键字：
        <span style="color:red">{{keyword}}</span>，共
        <span style="color:red">{{total}}</span>条数据
      </div>
      <div class="s-l" v-for="list in lists" :key="key">
        <a :href="'../../pages/detail/main?id=' + list.id + '&classid=' + list.classid">
          <div class="s-l-d">
            <div class="s-l-d-p">
              <img :src="list.titlepic" :alt="list.title">
            </div>
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
  </div>
</template>

<script>
import Search from "../../components/search";
import { getQuery } from "../../utils/function";
import { getSearchList } from "../../api/class";
import { $wuxToptips } from "../../../static/wux/index";

export default {
  components: { Search },
  data() {
    return {
      keyword: "",
      total: "",
      lists: [],
      scrollTop: 0,
      page: 1,
      limit: 10
    };
  },
  created() {},
  mounted() {
    var data = getQuery();

    this.classid = data.classid;
    this.keyword = data.keyword;

    data.page = this.page;
    data.limit = this.limit;
    this.getSearch(data);
  },
  methods: {
    getSearch(data) {
      getSearchList(data).then(res => {
        this.total = res.info.count;
        this.lists = res.data;
      });
    },
    scroll(e) {
      this.scrollTop = e.target.scrollTop;
    },
    loadMore(data) {
      getSearchList(data).then(res => {
        if (res.data != null) {
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
    }
  },
  watch: {
    scrollTop(curVal, oldVal) {
      if (this.scrollTop >= 450 * this.page) {
        this.page++;
        var data = {
          classid: this.classid,
          keyword: this.keyword,
          page: this.page,
          limit: this.limit
        };
        this.loadMore(data);
      }
    }
  }
};
</script>

<style>
.container {
  background-color: #f7f7f7;
  background-size: 100% 100%;
  position: fixed;
  height: 100%;
  width: 100%;
}
.s-r-i {
  text-align: left;
  margin: 20rpx 40rpx 0rpx 40rpx;
  font-size: 28rpx;
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
</style>
