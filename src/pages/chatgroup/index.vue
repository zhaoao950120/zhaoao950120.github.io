<template>
  <div>
     <div id="container">
			<div class="Wrap">
				<p>1.严禁发布违纪违法、黄赌毒和低俗诱惑内容，违规违法者后果自负，与小程序拥有者无关，并将违法者移交相关部门处理。</br>
				   2.发布违规内容不通知直接删除，不清楚的请先咨询客服，谢谢合作！</p>
			</div>
			
			<div class="Wrap-1">
				<picker class="List-1" @change="bindchange1" :value="index1" :range="option1">
					<p>所属行业选择</p>
					<view class="select_picker">
               		   {{option1[index1]}}
            		</view>
				</picker>

				<picker class="List-2" @change="bindchange2" :value="index2" :range="option2">
					<p>地区选择</p>
					<view class="select_picker">
               		   {{option2[index2]}}
            		</view>
				</picker>

				<picker class="List-3" @change="bindchange3" :value="index3" :range="option3">
					<p>标签</p>
					<view class="select_picker">
               		   {{option3[index3]}}
            		</view>
				</picker>
				<!-- <div class="List-1" ref="picker" @click="chioceA">所属行业选择</div> -->
				<!-- <div class="List-2">地区选择</div>
				<div class="List-3">标签</div> -->
				<div class="Wecname">
					<p>微信号名称</p>
					<input type="text" id="WechatName" placeholder="请输入名称"/>
				</div>
				<div class="Wecname1">
					<p>微信号ID</p>
					<input type="text" id="WechatID" placeholder="请输入ID"/>
				</div>
				<div class="pic">
					<div class="Left">
						<p>微信头像</p>
						<div class="D1" @click="Upfile">
							<img src="../../static/img/icon1.png" alt="" class="img">
						</div>
					</div>
					<div class="Right">
						<p>微信二维码</p>
						<div class="D2" @click="Upfile1">
							<img src="../../static/img/icon1.png" alt="" class="img">
						</div>
					</div>
				</div>
				<div class="introduction">
					<p>简介/介绍</p>
					<div class="introduction1">
						<span class="tex">请输入不少于15个文字的介绍，介绍越详细，图片越清晰，可为您带来更多浏览量。</span>
					</div>
				</div>
			</div>
			
			<!--底部footer-->
			<div class="footer">
				<div class="Left1">发布需支付:<span id="se">  5元</span></div>
				<div class="Right1">立即发布</div>
			</div>
			
		</div>
  </div>
</template>

<script>
// 导入组件

export default {
	data (){
	return {
		    index1:0,
			index2:0,
			index3:0,
			option1: ['股票', '金融', '债卷'],
			option2: ['一', '二', '三','四','五'],
			option3: ['行业交流', '同行输送', '个人理解']
		}
	},
	methods:{
	  Upfile(){
		wx.chooseImage({
			success(res) {
				const tempFilePaths = res.tempFilePaths
				wx.uploadFile({
				url: 'https://qq.zhongyi9999.com/e/extend/api/index.php?m=upload&c=image',
				filePath: tempFilePaths[0],
				name: 'file',
				formData: {
					user: 'test'
				},
				success(res) {
					const data = res.data
					console.log(11111);
				}
				})
			}
			})
		},
		 bindchange1:function (e) {
			this.index1 = e.mp.detail.value
		},
		bindchange2:function (e) {
			this.index2 = e.mp.detail.value
		},
		bindchange3:function (e) {
			this.index3 = e.mp.detail.value
		}
	}
};
</script>

<style scope>
*{
	margin: 0;
	padding: 0;
}

input{background:none;outline:none;border:0px;}

input::-webkit-input-placeholder{
            color:#000;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#000;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#000;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:#000;
    }
    
#se{color:orange;font-size: 24px;font-weight: 600;}

#container{
	width:100%;
	height:100%;
	display:flex;
	flex-direction:column;
    align-items: center;
    background: #F7F7F7;
}

#container .Wrap{
	width:100%;
	height:126px;
	line-height: 20px;
	background: #fff;
}

#container .Wrap p{
	width: 90%;
	font-size: 14px;
	color:red;
	margin: 15px auto;
}

#container .Wrap-1{
	width:100%;
	height:100%;
	background: #fff;
	margin-top: 15px;
	display:flex;
	flex-direction:column;
    align-items: center;
}

#container .List-1,#container .List-2,#container .List-3{
	width:90%;
	height:40px;
	line-height: 40px;
	background:#fff;
	font-size: 14px;
	border-bottom:1px solid #ccc;
	background: url(../../static/img/icon.png) 323px 16px no-repeat;
	background-size: 2%;
}

.List-1 p,.List-2 p,.List-3 p{
	float:left;
	display: inline-block;
}

.List-1 .select_picker,.List-2 .select_picker,.List-3 .select_picker{
	width:60%;
	float:right;
	text-align: right;
	margin-right: 40px;
}

.Wrap-1 .Wecname,.Wrap-1 .Wecname1{
	width:90%;
	height:40px;
	line-height: 40px;
	font-size: 14px;
	color:#000;
	border-bottom:1px solid #ccc;
}

.Wecname p,.Wecname1 p{
	float:left;
	display: inline-block;
}

.Wrap-1 input{
	width:60%;
	height:40px;
	font-size: 14px;
	color:#000;
	float:left;
	margin-left: 15px;
}

.Wrap-1 .pic{
	width:90%;
	height:137px;
}

.Wrap-1 .Left{
	width:50%;
	height:137px;
	float: left;
	/* background: url(../../static/img/icon1.png) 70px 25px no-repeat; */
}

.Wrap-1 .Right{
	width:50%;
	height:137px;
	float: left;
	/* background: url(../../static/img/icon1.png) 80px 25px no-repeat; */
}

.Wrap-1 .Left p,.Wrap-1 .Right p{
	font-size: 14px;
	margin-top: 20px;
	display: inline-block;
}

.Wrap-1 .D1{
	width:55%;
	height:100px;
	float:right;
	margin-top: 24px;
	margin-right:15px;
}

.Wrap-1 .D2{
	width:55%;
	height:100px;
	float:right;
	margin-top: 24px;
}

.D1 .img,.D2 .img{
	width:100%;
	height:100%;
}

.Wrap-1 .introduction{
	width:90%;
	height:100px;
}

.Wrap-1 .introduction p{
	width:22%;
	height:60px;
	font-size: 14px;
	float: left;
    border-bottom:1px solid #ccc;
}

.Wrap-1 .introduction .introduction1{
	width:78%;
	height:60px;
	font-size: 14px;
	float: left;
    border-bottom:1px solid #ccc;
}

.Wrap-1 .introduction .introduction1 .tex{
	font-size: 14px;
}



/*//底部footer*/
#container .footer{
	width:100%;
	height:50px;
	position: fixed;
	bottom: 0;
	box-shadow: 0 0 12px 5px #ccc;
}

#container .footer .Left1{
	width:58%;
	height:50px;
	line-height:50px;
	text-align: center;
	float: left;
	font-size: 16px;
}

#container .footer .Right1{
	width:42%;
	height:50px;
	line-height: 50px;
	text-align: center;
	float: left;
	font-size: 16px;
	background: #ccc;
	color:#fff;
}
</style>
