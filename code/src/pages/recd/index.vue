<template>
  <div class="section">
    <scroll-view>
      <div class="container">
        <div class="Wrap">
          <div class="s-l" v-for="(id,index) in lists" :key="index">
            <div class="s-l-d">
              <div class="s-l-d-p">
                <div class="Wei">
                  [{{id.classname}}]
                  <span class="gl">{{id.title}}</span>
                </div>
                <div>{{id.truetime}}</div>
              </div>
              <div class="s-l-d-i">
                <div class="s-l-i-t">
                  <div class="Wei1">-{{id.cardfen}}</div>
                  <!-- <div>余额: 95.00</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import { getXfmxList } from "../../api/class.js";
export default {
  data() {
    return {
      lists: [],
      scrollTop: 0,
      userid: 46,
      classid: 1
    };
  },
  mounted(data) {
    console.log(222222);
    var that = this;
    var UserNameId = wx.getStorageSync("userid");
    console.log(UserNameId);
    that.userid = UserNameId;

    this.getXfm(UserNameId);
  },
  methods: {
    scroll(e) {
      this.scrollTop = e.target.scrollTop;
    },
    getXfm(UserNameId) {
      
      var that = this;
      wx.request({
        url:
          "https://qq.zhongyi9999.com/e/extend/api/index.php?m=user&c=userinfo&userid=userid",
        data: {
          userid: UserNameId,
          type: "xfmx"
        },
        header: {
          "content-type": "application/json" // 默认值
        },
        success(data) {
          var hanyeList = data.data;
          var itemArray = hanyeList.data;
          console.log(itemArray);
          that.lists = itemArray;
        }
      });
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
    }
  },
  watch: {
    scrollTop(curVal, oldVal) {
      if (this.scrollTop >= 560 * this.page) {
        this.page++;
        var data = {
          classid: this.classid
        };
        this.loadMore(data);
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

body {
  background-color: #000;
}

button {
  border: 0;
  background-color: transparent;
  outline: none;
}

.container {
  background-color: #f0f0f0;
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
}

.section {
  width: 100%;
  background: #f0f0f0;
}

.Wrap {
  padding-top: -10px;
}

.s-l {
  width: 95.3%;
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
  border-top: 1px solid #ccc;
}
.s-l-d-p {
  width: 300rpx;
  /* height: 150rpx; */
  float: left;
  color: #999999;
  font-size: 28rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 48rpx;
  font-weight: 500;
}

.s-l-d-i {
  width: 300rpx;
  /* height: 150rpx; */
  float: right;
  color: #999999;
  font-size: 28rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 48rpx;
  font-weight: 500;
  text-align: right;
}

.s-l-i-t {
  /* color: #5e5e5e; */
  font-size: 28rpx;
}
.s-u-c-s {
  float: right;
  font-size: 14px;
  color: rgb(4, 187, 243);
}

.s-l-d-p .Wei {
  color: rgb(4, 187, 243);
}

.s-l-d-p .gl {
  color: #000;
}

.s-l-d-i .Wei1 {
  color: red;
}
</style>


