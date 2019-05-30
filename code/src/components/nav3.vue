// 底部footer3
<template>
  <div>
    <wux-tabbar defaultCurrent="tab3" position="bottom" theme="calm">
      <div id="to" @click="Tohome">
        <wux-tabbar-item key="tab1" title="首页">
          <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-on"/>
          <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-off"/>
        </wux-tabbar-item>
      </div>

      <div id="go" @click="Toclass">
        <wux-tabbar-item key="tab2" title="分类信息">
          <wux-icon wux-class="icon" type="ios-paper" size="22" slot="icon-on"/>
          <wux-icon wux-class="icon" type="ios-paper" size="22" slot="icon-off"/>
        </wux-tabbar-item>
      </div>

      <div id="open" @click="Toopen">
        <wux-tabbar-item key="tab3" title="我的">
          <wux-icon wux-class="icon" type="ios-person" size="25" slot="icon-on"/>
          <wux-icon wux-class="icon" type="ios-person" size="25" slot="icon-off"/>
        </wux-tabbar-item>
      </div>
    </wux-tabbar>
  </div>
</template>
<script>
export default {
  props: {
    initKey: {
      type: String,
      default: "tab1"
    }
  },
  data() {
    return {
      key: this.initKey
    };
  },
  methods: {
    //跳转至我的页面方法
    Toopen(e) {
      var userid = wx.getStorageSync("userid");
      console.log(userid);
      console.log(22222);
      if (userid) {
        wx.redirectTo({
          url: "../../pages/mine/main?modid=9&classid=2"
        });
      } else {
        wx.redirectTo({
          url: "../../pages/gologin/main?modid=9&classid=2"
        });
      }
    },
    Toclass(e) {
      wx.redirectTo({
        url: "../../pages/class/main?modid=9&classid=1"
      });
    },
    Tohome(e) {
      wx.redirectTo({
        url: "../../pages/index/main"
      });
    }
  }
};
</script>

