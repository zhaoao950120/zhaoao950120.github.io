<template>
    <div class="search">
        <picker @change="bindPickerChange" :value="defvalue" :range="array" class="s-c" :range-key="'classname'">
            <view class="picker">
                {{array[index].classname}}
            </view>
        </picker>
        <input type="text" name="" placeholder="搜出你想要的" class="s-i" placeholder-class="ph-s-i" maxlength="50" cursor-spacing="20" confirm-type="search" @confirm="searchdata($event)">
        <span class="s-icon" ></span>
    </div>
</template>

<script>
import { getClassList } from "../api/class"
import { $wuxToptips } from '../../static/wux/index'

export default {
    props:{
        checkClass:{
            type:Number,
            default:0
        }
    },
    data () {
        return {
            index: this.checkClass,
            array: [{classname:'搜索分类',classid:''}],
            defvalue:'',
        }
    },
    created(){
        this.getClass()
    },
    methods: {
        bindPickerChange (e) {
            this.index = e.target.value
            this.defvalue = this.array[this.index].classid
        },
        getClass(){
            getClassList().then((res) => {
                this.array = this.array.concat(res.data)
            })
        },
        searchdata(e){
            if(this.defvalue == ''){
                $wuxToptips().warn({
                    hidden: true,
                    text: '请选择搜索分类',
                    duration: 3000,
                    success() {},
                })
            }else if(e.target.value == ''){
                    $wuxToptips().warn({
                    hidden: true,
                    text: '请输入关键词',
                    duration: 3000,
                    success() {},
                })
            }else{
                var url = "../search/main?classid="+this.defvalue+"&keyword="+e.target.value
                wx.navigateTo({url})
            }
        }
    }
}
</script>

<style>
.search{
    position: relative;
    font-size: 30rpx;
    margin: 0 auto;
    margin-top: 40rpx;
    width: 90%;
}
.search .s-c{
    position: absolute;
    border-right: 1px solid #e6e6e6;
    padding: 0 30rpx;
    top: 24rpx;
    width: 120rpx;
    overflow: hidden;
    font-size: 24rpx;
    color: #808080;
    background : url(../../static/img/select-icon.png) no-repeat;
    background-position :142rpx center; 
    background-size:18rpx 10rpx;

}
.search .s-icon{
    display: inline-block;
    width: 100rpx;
    height: 85rpx;
    border-radius: 0  43rpx 43rpx 0 ;
    background: #ccc;
    background: url(../../static/img/search-icon.png) no-repeat;
    background-position:center center;
    background-size:30rpx 30rpx;
    position: absolute;
    z-index: 10;
    right: 0;
    top: 0;
}
.s-c view{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.s-i{
    border: 1px solid #F3F7FA;
    border-radius: 40rpx;
    padding-left: 200rpx;
    padding-right: 100rpx;
    height: 80rpx;
    line-height: 80rpx;
    background-color: #FFF;
    color: #C5C5C5;
}
.ph-s-i{
    color: #C5C5C5;
}
</style>











