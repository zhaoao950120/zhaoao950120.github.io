<template>
  <div>
    <div class="container">
      <div class="section">
        <div class="section-1">
         
          <div class="b-c">
            <a href="../../pages/res/main?modid=9&classid=1" hover-class="none">
              <div class="b-c-e">
                <img src="../../static/img/grwx.png" alt>
              </div>
              <div class="b-c-i">
                <p>个人微信</p>
                <p class="action">发布个人微信二维码</p>
              </div>
            </a>
          </div>
          <div class="b-c">
            <a href="../../pages/res/main?modid=11&classid=194" hover-class="none">
                <div class="b-c-e">
                  <img src="../../static/img/wxq.png" alt="">
                </div>
            <div class="b-c-i">
                <p>微信群</p>
                <p class="action">发布微信群二维码</p>
            </div>
            </a>
        </div>
        <div class="b-c">
            <a href="../../pages/res/main?modid=15&classid=270" hover-class="none">
                <div class="b-c-e">
                  <img src="../../static/img/qzr.png" alt="">
                </div>
            <div class="b-c-i">
                <p>群转让</p>
                <p class="action">发布转让信息</p>
            </div>
            </a>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入组件

export default {
  mounted(data){
    var classid = wx.setStorageSync('classid')
  }
};
</script>

<style scope>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.section-1 {
  width: 60%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.b-c{
  width:100%;
  height:33.33%;
}

.b-c-e{
  width:41%; 
  height:246rpx;
  float: left;
}

.b-c-i{
  width:57%;
  height:246rpx;
  line-height: 25px;
  float:right;
  display: flex;
  flex-direction: column;
  align-items: left;
  font-size: 14px;
  justify-content: center;
}

.b-c-e img{
  margin-left:45rpx;
  margin-top:55rpx;

}

.action{color:#808080;}
</style>
