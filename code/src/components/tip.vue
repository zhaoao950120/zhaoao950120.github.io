// 提示组件
<template>
  <div>
    <div class="father-1">
      <div class="mask1" v-show="maskShow1">
        <div class="mask2">
          <!-- <p class="action1">提示</p> -->
          <p class="action">请注册后登录</p>
          <!-- <button class="btn1" @click="!registerAn1">确定</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      maskShow1: false
    };
  },
  methods: {
    registerAn1() {
      this.maskShow1 = !this.maskShow1;
    }
  }
};
</script>

<style scope>
.father-1 {
  width: 100%;
  height: 100%;
}
.mask1 {
  width: 100%;
  height: 93%;
  position: fixed;
  top: 0;
  left: 0;
  /* background: rgba(0, 0, 0, 0.3); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: translateY(0%);
  -webkit-transform: translateY(0%);
  align-items: center;
  z-index: 999;
  animation: show-toast 5s;
  -webkit-animation: show-toast 5s;
  opacity: 0;
}
button {
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.mask1 .mask2 {
  width: 39%;
  height: 5%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.mask2 p {
  font-size: 15px;
  color: #fff;
}
.mask2 .btn1 {
  width: 70%;
  height: 65rpx;
  line-height: 65rpx;
  text-align: center;
  margin-top: 25rpx;
  color: #fff;
  font-size: 14px;
  background: linear-gradient(to right, #56b7fb, #389af5);
  background-size: 100% 100%;
  border-radius: 15px;
}

.action {
  font-size: 13px;
  color: rgb(75, 74, 74);
}

.action1 {
  font-weight: 800;
}

@keyframes show-toast {
  30% {
    opacity: 0;
    transform: translateY(0%, 0);
    -webkit-transform: translateY(0%, 0);
  }
  70% {
    opacity: 1;
    transform: translateY(0%, 0);
    -webkit-transform: translateY(0%, 0);
  }
  100% {
    opacity: 0;
    transform: translateY(0%, 0);
    -webkit-transform: translateY(0%, 0);
  }
}
</style>


