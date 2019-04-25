<template>
  <div>
    <wux-tabbar defaultCurrent="tab1" position="bottom" theme="calm">
      <a href="../../pages/index/main">
        <wux-tabbar-item key="tab1" title="首页">
          <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-on"/>
          <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-off"/>
        </wux-tabbar-item>
      </a>
      <a href="../../pages/class/main?modid=9&classid=1">
        <wux-tabbar-item key="tab2" title="分类信息">
          <wux-icon wux-class="icon" type="ios-paper" size="22" slot="icon-on"/>
          <wux-icon wux-class="icon" type="ios-paper" size="22" slot="icon-off"/>
        </wux-tabbar-item>
      </a>
    
      <div id="open" @click="open">
        <wux-tabbar-item key="tab3" title="我的">
          <wux-icon wux-class="icon" type="ios-keypad" size="24" slot="icon-on"/>
          <wux-icon wux-class="icon" type="ios-keypad" size="24" slot="icon-off"/>
        </wux-tabbar-item>
      </div>
    </wux-tabbar>
    
  </div>
</template>
<script>

export default {
    props:{
       initKey:{
           type:String,
           default:'tab1'
       }
    },
    data(){
        return{
          key:this.initKey
        }
    },
    methods:{
        //跳转至我的页面方法
        open(e){
            var userid = wx.getStorageSync("userid")
            console.log(userid)
            console.log(11111)
            if(userid){
                 wx.navigateTo({
                    url: '../../pages/mine/main?modid=9&classid=2'
            })
            }else{
                 wx.navigateTo({
                    url: '../../pages/gologin/main?modid=9&classid=2'
            })
          }
        }

         

    //   onChange(e){
    //       var key = e.target.key
    //       this.globalData.key = key
    //   },
    //   switchTo1(){
    //       const url = '../../pages/index/main'
    //         console.log(url)
    //       wx.switchTab({ url })
    //   },
    //   switchTo2(){
    //     //   const url = '../../pages/class/main'
    //     //   console.log(url)
    //     //   wx.switchTab({ url })
    //     wx.switchTab({ url: '../../pages/class/main', success: function (res) { console.log('成功') }, fail: function (res) { console.log('失败') } })
    //   }
      
    }
}
</script>

