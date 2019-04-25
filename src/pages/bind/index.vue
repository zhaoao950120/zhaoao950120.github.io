<template>
  <div>
    <div class="container">
      <div class="section">
        <div class="section-1">
          <div class="top">
            <p>绑定已有账号，同步小程序和PC端用户数据</p>
          </div>

          <div class="phoneNumber action">
            <input type="number" placeholder="输入本人手机号" @blur='getusername' auto-focus>
          </div>

          <div class="possword">
            <input type="password" placeholder="输入密码" @blur='getpassword'>
          </div>

          <button class="btn" @click = "bindAn">绑定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bindAn } from '../../api/user.js';
export default {
   data() {
    return {
      username:'',
      password:'',
      unionid:''
    };
  },
   methods: {
      //获取input输入的值
      getusername(e) {
        this.username = e.mp.detail.value
      },
      getpassword(e) {
        this.password = e.mp.detail.value 
      },
      bindAn(data){
         var _this = this;
         if(_this.username == "" || _this.password == "" ){
            wx.showToast({
              title: '请核对',
              icon: 'none',
              duration: 1000
            })
          }else{
              var that = this;
              var unionid = wx.getStorageSync('unionId')
              that.unionId = unionid
              console.log(that.unionId)
              let data = {'username':_this.username,'password':_this.password}
              wx.request({
                data: {
                      username:_this.username,
                      password:_this.password,
                      unionid:unionid
                    },
                    'url': 'https://qq.zhongyi9999.com/e/extend/api/index.php?m=user&c=isbind', 
                    success:(res) => {
                      console.log(res.data)
                       setTimeout( () => {
                            iscode: res.data
                          }, 1000)
                      
                      wx.setStorageSync("username", "_this.username")
                      wx.setStorageSync("password", "_this.password")
                      var userid = res.data.data.userid
                      var userfen = res.data.data.userfen
                      wx.setStorageSync("userid",userid)
                      wx.setStorageSync("userfen",userfen)
                       /*注册成功之后再跳回登录页*/
                      setTimeout(function(){
                          wx.navigateTo({
                            url: '../../pages/mine/main?modid=9&classid=2'
                       })
                      }.bind(this),1000)

            }
          })
  }
      }
}
}
</script>

<style scope>
input{background:none;outline:none;border:0px;}

.clear{clear:both;}

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
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-1 {
  width: 90%;
  height: 100%;
}

.section-1 .top {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 15px;
  color: #808080;
}

.section-1 .phoneNumber,.section-1 .possword{
	width:100%;
	height:50px;
	margin-top: 15px;
	border:1px solid #ccc;
	border-radius: 50px;
}

.section-1 .phoneNumber input,.section-1 .possword input{
	width:80%;
	height:50px;
	margin-left: 45px;
	/* margin-top: 6px; */
	font-size: 18px;
}

.section-1 .btn{
	width:100%;
	height:50px;
    line-height: 50px;
	background:#56B7FB;
	margin-top: 20px;
	font-size: 18px;
	color:#fff;
	border-radius: 50px;
}

.action{margin-top: 0px !important;}

</style>
