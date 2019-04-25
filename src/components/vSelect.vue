<template lang="html">
  <section>
    <section class="select_area" :style="areaStyle" v-if="isshow">
      <section class="select" v-for="(select,index) in data" :key="index">
        <section class="label" :class="index==active?'active':''" :style="labelStyle" @click="showOption(index)">
          <span class="label-text">{{select.label}}</span>
          <img class="labelImg" v-show="index!=active" src="../../static/img/choose.png" mode="aspectFit">
          <img class="labelImg" v-show="index==active" src="../../static/img/choose-active.png" mode="aspectFit">
        </section>
      </section>
      <section class="options">
        <section class="option-area" v-for="(select,index) in data" :key="index">
          <section class="option" :data-value="option.value" :data-field="select.field" ref="dataValue" v-for="(option,key) in select.option" :key="key" v-show="showOptions[index].show" @click="getChange($event,index,key)">
            <img class="optionImg" v-show="index==active&&key==active2[index].choose" src="../../static/img/tack.png" mode="aspectFit">
            <span class="option-text">{{option.name}}</span>
          </section>
        </section>
      </section>
    </section>
    <section :style="nouse"></section>
  </section>
</template>
 
<script>
  export default {
    props:['data','align','fix'],
    data(){
      return {
        //参数错误则不显示ui组件
        isshow:true,
        //显示的option内容
        showOptions:[],
        //选中的下拉框
        active:-1,
        //下拉框的选值
        active2:[],
        //返回信息
        res:{code:0,msg:'success'},
        // 整个组件样式
        areaStyle:'',
        //标题样式
        labelStyle:'',
        //负责占位的样式
        nouse:"",
        //处理结果
        result:{},
      }
    },
    methods:{
      //初始化设置
      init(){
        for(var i=0;i<this.data.length;i++){
          this.showOptions.push({'show':false});
          this.active2.push({'choose':-1});
          // this.result.push(null);
        }
        console.log(this.active,this.active2)
      },
      //检验标准
      ifTrue(){
        if(this.data.length>4||this.data.length<1){
          this.res = {
            code:-1,
            msg:'Vselect选项必须有1-4个'
          };
        }else if (typeof(this.align) != 'undefined' && this.align!="left" && this.align!="center"){
          this.res = {
            code:-2,
            msg:'align参数错误，默认为left，可选值为left、center'
          };
          return false
        }else if (typeof(this.fix) != 'undefined' && this.fix!='' && this.fix!="true" && this.fix!="false"){
          this.res = {
            code:-3,
            msg:'fix参数错误，默认为false，可选值为true、false'
          };
        }
        else{
          return true;
        }
      },
      //进行渲染
      isTrue(){
        if(this.ifTrue()){
          this.setLabelWidth();
          this.setAlign();
          this.setFix();
        }else{
          this.isshow = false;
          console.log({error:this.res});
        }
      },
      //设置宽度
      setLabelWidth(){
        this.labelStyle += `width:${750/this.data.length}rpx;`;
      },
      //设置对齐方式
      setAlign(){
        if(this.align=='center'||this.align=='left'){
          this.labelStyle += `text-align:${this.align};`;
        }
      },
      //设置固定
      setFix(){
        if(this.fix=="true" || this.fix==''){
          // this.areaStyle+="position:fixed;top:0;"
          // this.nouse+="height:39px;"
        }
      },
      // 显示选项
      showOption(index){
        //设置样式
        if(this.active == index){
          this.active = -1;
        }else{
          this.active = index;
        }
        //显示选项
        if(this.showOptions[index].show == true){
          this.showOptions[index].show = false;
        }else{
          for(var i=0;i<this.showOptions.length;i++){
            this.showOptions[i].show = false;
          }
          this.showOptions[index].show = true;
        }
      },
      //一改变获取结果函数
      getChange(e,index,key){
        this.active2[index].choose = key;
        this.result[e.currentTarget.dataset.field] = e.currentTarget.dataset.value;
        this.$emit('change',this.result)
      },
 
 
    },
    mounted(){
      this.isTrue();
    },
    created(){
      this.init();
    },
    onUnload: function(){
      this.active = -1
    }
  }
</script>
 
<style lang="css" scoped>
  .select_area{
      width: 750rpx;
      height: 39px;
      font-size: 30rpx;
      background: white;
  }
  .select{
      display:inline-block;
      line-height: 39px;
  }
  .label{
      /* padding-top: 8px; */
      height: 30px;
      font-size: 30rpx;
      text-align:left;
  }
  .label-text{
      padding-left: 10px;
  }
  .active{
      color:#fe7723;
  }
  .options{
      animation: 5px;
      position: absolute;
      background:#FFF;
      width:100%;
      margin-top: 8px;
      box-shadow:0px 3px 6px rgba(0, 0, 0, 0.2);
      /* border-bottom: 1px solid #CCCCCC; */
  }
  .option-area{
      max-height: 230px;
      overflow:auto;
  }
  .option{
      border-top: 1px solid #F7F7F7;
      padding: 5px;
      font-size: 30rpx;
      line-height:55rpx;
      position: relative;
  }
  .option-text{
      font-size: 30rpx;
      height: 25px;
      margin-left:50px;
  }
  .labelImg{
      padding-left: 8px;
      padding-top: 0px;
      width: 12px;
      height: 12px
  }
  .optionImg{
      position:absolute;
      margin-left:16rpx;
      width:40rpx;
      height:53rpx;
  }
</style>