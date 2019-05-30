<template>
  <div class="container">
    <div class="logo">
        <img src="../../../static/img/logo.png" class="logo-img">
    </div>
    <class-bottom />
    <search />
    <nav-bottom />
    <wux-toptips id="wux-toptips" />
  </div>
</template>

<script>
// 导入组件
import Search from "../../components/search"
import NavBottom from "../../components/nav"
import ClassBottom from "../../components/classButton"

export default {
    components: { Search,NavBottom,ClassBottom },
}
</script>

<style>
.container{
    background-image:url("http://www.zhongyi9999.com/public/img/index_background.png");
    background-size: 100% 100%;
    position: fixed;
    height: 100%;
    width: 100%;
    display:flex;
    flex-direction:column;
    align-items:center;/*垂直居中*/
}
.logo{
    height: 170rpx;
    text-align: center;
    margin-top: 20%;
    margin-bottom: 40rpx;
}
.logo-img{
    width:370rpx;
    height:165rpx;
}
</style>


