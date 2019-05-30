<template>
  <div>
    <div class="father">
      <div class="mask" v-show="maskShow">
        <div class="mask-1">
          <button class="btn" @click="bindAn">绑定已有账号</button>
          <button class="btn1" @click="registerAn">注册新的账号</button>
        </div>
        <!-- <button class="close" @click="!setMaskShow"></button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      maskShow: false
    };
  },
  methods: {
    setMaskShow() {
      this.maskShow = !this.maskShow;
    },
    bindAn() {
      wx.navigateTo({
        url: "../../pages/bind/main"
      });
    },
    registerAn() {
      wx.navigateTo({
        url: "../../pages/register/main"
      });
    }
  }
};
</script>

<style scoped>
.father {
  width: 100%;
  height: 100%;
}
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
button {
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.child {
  position: fixed;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 400px;
  top: calc(50% - 200px);
  left: calc(50% - 200px);
  background: #fff;
}

.mask .mask-1 {
  width: 68%;
  height: 40%;
  border-radius: 15px;
}

.mask-1 .btn {
  width: 70%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  margin-top: 85rpx;
  color: #fff;
  font-size: 16px;
  background: linear-gradient(to right, #56b7fb, #389af5);
  background-size: 100% 100%;
  border-radius: 15px;
}

.mask-1 .btn1 {
  width: 70%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  margin-top: 25rpx;
  color: #fff;
  font-size: 16px;
  background: linear-gradient(to right, #56b7fb, #389af5);
  background-size: 100% 100%;
  border-radius: 15px;
}

.mask .close {
  width: 12%;
  height: 7%;
  border-radius: 50%;
  margin-top: 15px;
  border: 2px solid #ccc;
  background: url(../static/img/close.png) 22rpx 20rpx no-repeat;
  background-size: 50% 50%;
}
</style>
