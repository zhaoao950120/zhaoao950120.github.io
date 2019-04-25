<template>
  <div>
     <div id="container">
			<div class="Wrap">
				<p>1.严禁发布违纪违法、黄赌毒和低俗诱惑内容，违规违法者后果自负，与小程序拥有者无关，并将违法者移交相关部门处理。</br>
				   2.发布违规内容不通知直接删除，不清楚的请先咨询客服，谢谢合作！</p>
			</div>
			
			<div class="Wrap-1">
				
				<div @click="showSinglePicker" class="List-1"> 
						<p>所属行业选择</p>
						 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{pickerText2}}
				</div>
			
				<div @click="showMulLinkageTwoPicker" class="List-2">
					<p>地区选择</p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{pickerText}}
				</div>
				<mpvue-picker ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault" :themeColor="themeColor" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>

				<picker class="List-3" @change="getPickerList3" :value="value3" :range="arrdata3">
					<p>标签</p>
					<view class="select_picker">
               {{arrdata3[value3]}}
          </view>
				</picker>

				<div class="Wecname">
					<p>微信号名称</p>
					<input type="text" id="WechatName" placeholder="请输入名称" @blur="WechatName"/>
				</div>
				<div class="Wecname1">
					<p>微信号ID</p>
					<input type="text" id="WechatID" placeholder="请输入ID" @blur="WechatID"/>
				</div>
				<div class="pic">
					<div class="Left">
						<p>微信头像</p>
						<div class="D1" @click="Upfile">
							<img :src="imgleft" v-if="imgleft" alt="" class="img">
						</div>
					</div>
					<div class="Right">
						<p>微信二维码</p>
						<div class="D2" @click="Upfile1">
								<img :src="imgright" v-if="imgright" alt="" class="img">
						</div>
					</div>
				</div>
				<div class="introduction">
					<p>简介/介绍</p>
						<textarea name="" id="introduction" cols="30" rows="10" class="introduction1" placeholder="请输入不少于15个文字的介绍，介绍越详细，图片越清晰，可为您带来更多浏览量。" @blur="introduction"></textarea>
				</div>
			</div>
			
			<!--底部footer-->
			<div class="footer">
				<div class="Left1">发布需支付:<span id="se">{{gprice}}元</span></div>
				<div class="Right1" @click="release" :style="{background:(ismale ? '#ccc': '#56b7fb')}">立即发布</div>
			</div>
			
		</div>
  </div>
</template>

<script>
// 导入组件
import { getPickerList,getIndustryList,getUpfileList } from '../../api/class.js';
import mpvuePicker from '@/components/mpvuePicker.vue';
import mpvuepicker1 from '@/components/selectPicker.vue';

export default {
	components:{ mpvuePicker,mpvuepicker1 },
	data (){
	return {
			imgleft:'../../static/img/icon1.png',
			imgright:'../../static/img/icon1.png',
			tempFilePaths: '',
			value3:'',
			arrdata3:[],
			pickerText2:'',
			index: 0,
			ismale:true,
			classid:1,
			userId:'',
			SelectValue:'',
			CityValue:'',
			Vs:'',
			Wn:'',
			Ind:'',
			Wd:'',
			gprice:'',
			mode: 'selector',
			deepLength: 0, // 几级联动
			pickerValueDefault: [], // 初始化值
			pickerValueArray: [], // picker 数组值
			pickerText: '',
			pickerText1: '',
			themeColor: '', // 颜色主题
			pickerSingleArray:[
							 {label: "股票",value: 1},{label: "外汇",value: 2},{label: "期货",value: 3},{label: "黄金",value: 4},{label: "汽油",value: 5},{label: "微商", value: 98},{label: "保险", value: 44},
							 {label: "贷款", value: 45},{label: "信用卡", value: 46},{label: "鸡蛋", value: 47},{label: "生猪", value: 48},{label: "大豆", value: 49},{label: "玉米", value: 50},{label: "花生", value: 51},
							 {label: "棉花", value: 52},{label: "钢材", value: 53},{label: "建材", value: 54},{label: "天然气", value: 55},{label: "甲醇", value: 56},{label: "乙醇", value: 57},{label: "PVC", value: 58},
							 {label: "玻璃", value: 59},{label: "水泥", value: 60},{label: "枸杞", value: 61},{label: "龙虾", value: 62},{label: "小麦", value: 63},{label: "生姜", value: 64},
							 {label: "大蒜", value: 65},{label: "茶叶", value: 66},{label: "酒", value: 67},{label: "化肥", value: 68},{label: "苗木", value: 69},{label: "基金", value: 97}],
			mulLinkageTwoPicker: [
				{label: '北京',value: 394,children: [{label: '北京',value: 2}]},
				{label: '上海',value: 395,children: [{label: '上海',value: 3}]},
				{label: '天津',value: 396,children: [{label: '天津',value: 4}]},
				{label: '重庆',value: 397,children: [{label: '重庆',value: 5}]},
				{label: '河北省',value: 6,children: [{label: '石家庄市',value: 36},{label: '唐山市',value: 37},{label: '秦皇岛市',value: 38},{label: '邯郸市',value: 39},{label: '邢台市',value: 40},{label: '保定市',value: 41},{label: '张家口市',value: 42},{label: '承德市',value: 43},{label: '沧州市',value: 44},{label: '廊坊市',value: 45},{label: '衡水市',value: 46}]},
				{label: '山西省',value: 7,children: [{label: '太原市',value: 47},{label: '大同市',value: 48},{label: '阳泉市',value: 49},{label: '长冶市',value: 50},{label: '晋城市',value: 51},{label: '朔州市',value: 52},{label: '晋中市',value: 53},{label: '运城市',value: 54},{label: '忻州市',value: 55},{label: '临汾市',value: 56},{label: '吕梁市',value: 57}]},
				{label: "内蒙古自治区", value: 8,children:[{label: "呼和浩特市", value: "58"},{label: "包头市", value: "59"},{label: "乌海市", value: "60"},{label: "赤峰市", value: "61"},{label: "通辽市", value: "62"},{label: "鄂尔多斯市", value: "63"},{label: "呼伦贝尔市", value: "64"},{label: "巴彦淖尔市", value: "65"},{label: "乌兰察布市", value: "66"},{label: "兴安盟", value: "67"},{label: "锡林郭勒盟", value: "68"},{label: "阿拉善盟", value: "69"}]},
				{label: "辽宁省", value: 9,children:[{label: "沈阳市", value: "70"},{label: "大连市", value: "71"},{label: "鞍山市", value: "72"},{label: "抚顺市", value: "73"},{label: "本溪市", value: "74"},{label: "丹东市", value: "75"},{label: "锦州市", value: "76"},{label: "营口市", value: "77"},{label: "阜新市", value: "78"},{label: "辽阳市", value: "79"},{label: "盘锦市", value: "80"},{label: "铁岭市", value: "81"},{label: "朝阳市", value: "82"},{label: "葫芦岛市", value: "83"}]},
				{label: "吉林省", value: 10,children:[{label: "长春市", value: "84"},{label: "吉林市", value: "85"},{label: "四平市", value: "86"},{label: "辽源市", value: "87"},{label: "通化市", value: "88"},{label: "白山市", value: "89"},{label: "松原市", value: "90"},{label: "白城市", value: "91"},{label: "延边朝鲜族自治州", value: "92"}]},
				{label: "黑龙江省", value: 11,children:[{label: "哈尔滨市", value: "93"},{label: "齐齐哈尔市", value: "94"},{label: "鸡西市", value: "95"},{label: "鹤岗市", value: "96"},{label: "双鸭山市", value: "97"},{label: "大庆市", value: "98"},{label: "伊春市", value: "99"},{label: "佳木斯市", value: "100"},{label: "七台河市", value: "101"},{label: "牡丹江市", value: "102"},{label: "黑河市", value: "103"},{label: "绥化市", value: "104"},{label: "大兴安岭地区", value: "105"}]},			
				{label: "江苏省", value: 12,children:[{label: "南京市", value: "106"},{label: "无锡市", value: "107"},{label: "徐州市", value: "108"},{label: "常州市", value: "109"},{label: "苏州市", value: "110"},{label: "南通市", value: "111"},{label: "连云港市", value: "112"},{label: "淮安市", value: "113"},{label: "盐城市", value: "114"},{label: "扬州市", value: "115"},{label: "镇江市", value: "116"},{label: "泰州市", value: "117"},{label: "宿迁市", value: "118"}]},
				{label: "浙江省", value: 13,children:[{label: "杭州市", value: "119"}, {label: "宁波市", value: "120"}, {label: "温州市", value: "121"},{label: "嘉兴市", value: "122"},{label: "湖州市", value: "123"},{label: "绍兴市", value: "124"},{label: "金华市", value: "125"},{label: "衢州市", value: "126"},{label: "舟山市", value: "127"},{label: "台州市", value: "128"},{label: "丽水市", value: "129"}]},
				{label: "安徽省", value: 14,children:[{label: "合肥市", value: "130"}, {label: "芜湖市", value: "131"}, {label: "蚌埠市", value: "132"},{label: "淮南市", value: "133"},{label: "马鞍山市", value: "134"},{label: "淮北市", value: "135"},{label: "铜陵市", value: "136"},{label: "安庆市", value: "137"},{label: "黄山市", value: "138"},{label: "滁州市", value: "139"},{label: "阜阳市", value: "140"},{label: "宿州市", value: "141"},{label: "六安市", value: "142"},{label: "亳州市", value: "143"},{label: "池州市", value: "144"},{label: "宣城市", value: "145"}]},
				{label: "福建省", value: 15,children:[{label: "福州市", value: "146"}, {label: "厦门市", value: "147"}, {label: "莆田市", value: "148"},{label: "三明市", value: "149"},{label: "泉州市", value: "150"},{label: "漳州市", value: "151"},{label: "南平市", value: "152"},{label: "龙岩市", value: "153"},{label: "宁德市", value: "154"}]},
				{label: "江西省", value: 16,children:[{label: "南昌市", value: "155"}, {label: "景德镇市", value: "156"}, {label: "萍乡市", value: "157"},{label: "九江市", value: "158"},{label: "新余市", value: "159"},{label: "鹰潭市", value: "160"},{label: "赣州市", value: "161"},{label: "吉安市", value: "162"},{label: "宜春市", value: "163"},{label: "抚州市", value: "164"},{label: "上饶市", value: "165"}]},
				{label: "山东省", value: 17,children:[{label: "济南市", value: "166"}, {label: "青岛市", value: "167"}, {label: "淄博市", value: "168"},{label: "枣庄市", value: "169"},{label: "东营市", value: "170"},{label: "烟台市", value: "171"},{label: "潍坊市", value: "172"},{label: "济宁市", value: "173"},{label: "泰安市", value: "174"},{label: "威海市", value: "175"},{label: "日照市", value: "176"},{label: "莱芜市", value: "177"},{label: "临沂市", value: "178"},{label: "德州市", value: "179"},{label: "聊城市", value: "180"},{label: "滨州市", value: "181"},{label: "菏泽市", value: "182"}]},
				{label: "河南省", value: 18,children:[{label: "郑州市", value: "183"}, {label: "开封市", value: "184"}, {label: "洛阳市", value: "185"},{label: "平顶山市", value: "186"},{label: "安阳市", value: "187"},{label: "鹤壁市", value: "188"},{label: "新乡市", value: "189"},{label: "焦作市", value: "190"},{label: "濮阳市", value: "191"},{label: "许昌市", value: "192"},{label: "漯河市", value: "193"},{label: "三门峡市", value: "194"},{label: "南阳市", value: "195"},{label: "商丘市", value: "196"},{label: "信阳市", value: "197"},{label: "周口市", value: "198"},{label: "驻马店市", value: "199"},{label: "济源市", value: "200"}]},
				{label: "湖北省", value: 19,children:[{label: "武汉市", value: "201"}, {label: "黄石市", value: "202"}, {label: "十堰市", value: "203"},{label: "宜昌市", value: "204"},{label: "襄阳市", value: "205"},{label: "鄂州市", value: "206"},{label: "荆门市", value: "207"},{label: "孝感市", value: "208"},{label: "荆州市", value: "209"},{label: "黄冈市", value: "210"},{label: "咸宁市", value: "211"},{label: "随州市", value: "212"},{label: "恩施土家族苗族自治州", value: "213"},{label: "仙桃市", value: "214"},{label: "潜江市", value: "215"},{label: "天门市", value: "216"},{label: "神农架林区", value: "217"}]},
				{label: "湖南省", value: 20,children:[{label: "长沙市", value: "218"}, {label: "株洲市", value: "219"}, {label: "湘潭市", value: "220"},{label: "衡阳市", value: "221"},{label: "邵阳市", value: "222"},{label: "岳阳市", value: "223"},{label: "常德市", value: "224"},{label: "张家界市", value: "225"},{label: "益阳市", value: "226"},{label: "郴州市", value: "227"},{label: "永州市", value: "228"},{label: "怀化市", value: "229"},{label: "娄底市", value: "230"},{label: "湘西土家族苗族自治州", value: "231"}]},
				{label: "广东省", value: 21,children:[{label: "广州市", value: "232"}, {label: "韶关市", value: "233"}, {label: "深圳市", value: "234"},{label: "珠海市", value: "235"},{label: "汕头市", value: "236"},{label: "佛山市", value: "237"},{label: "江门市", value: "238"},{label: "湛江市", value: "239"},{label: "茂名市", value: "240"},{label: "肇庆市", value: "241"},{label: "惠州市", value: "242"},{label: "梅州市", value: "243"},{label: "汕尾市", value: "244"},{label: "河源市", value: "245"},{label: "阳江市", value: "246"},{label: "清远市", value: "247"},{label: "东莞市", value: "248"},{label: "中山市", value: "249"},{label: "潮州市", value: "250"},{label: "揭阳市", value: "251"},{label: "云浮市", value: "252"}]},
				{label: "广西壮族自治区", value: 22,children:[{label: "南宁市", value: "253"}, {label: "柳州市", value: "254"}, {label: "桂林市", value: "255"},{label: "梧州市", value: "256"},{label: "北海市", value: "257"},{label: "防城港市", value: "258"},{label: "钦州市", value: "259"},{label: "贵港市", value: "260"},{label: "玉林市", value: "261"},{label: "百色市", value: "262"},{label: "贺州市", value: "263"},{label: "河池市", value: "264"},{label: "来宾市", value: "265"},{label: "崇左市", value: "266"}]},
				{label: "海南省", value: 23,children:[{label: "海口市", value: "267"}, {label: "三亚市", value: "268"}, {label: "三沙市", value: "269"},{label: "五指山市", value: "270"},{label: "琼海市", value: "271"},{label: "儋州市", value: "272"},{label: "文昌市", value: "273"},{label: "万宁市", value: "274"},{label: "东方市", value: "275"},{label: "定安县", value: "276"},{label: "屯昌县", value: "277"},{label: "澄迈县", value: "278"},{label: "临高县", value: "279"},{label: "白沙黎族自治县", value: "280"},{label: "昌江黎族自治县", value: "281"},{label: "乐东黎族自治县", value: "282"},{label: "陵水黎族自治县", value: "283"},{label: "保亭黎族苗族自治县", value: "284"},{label: "琼中黎族苗族自治县", value: "285"}]},
				{label: "四川省", value: 24,children:[{label: "成都市", value: "286"}, {label: "自贡市", value: "287"}, {label: "攀枝花市", value: "288"},{label: "泸州市", value: "289"},{label: "德阳市", value: "290"},{label: "绵阳市", value: "291"},{label: "广元市", value: "292"},{label: "遂宁市", value: "293"},{label: "内江市", value: "294"},{label: "乐山市", value: "295"},{label: "南充市", value: "296"},{label: "眉山市", value: "297"},{label: "宜宾市", value: "298"},{label: "广安市", value: "299"},{label: "达州市", value: "300"},{label: "雅安市", value: "301"},{label: "巴中市", value: "302"},{label: "资阳市", value: "303"},{label: "阿坝藏族羌族自治州", value: "304"},{label: "甘孜藏族自治州", value: "305"},{label: "凉山彝族自治州", value: "306"}]},
				{label: "贵州省", value: 25,children:[{label: "贵阳市", value: "307"}, {label: "六盘水市", value: "308"}, {label: "遵义市", value: "309"},{label: "安顺市", value: "310"},{label: "毕节市", value: "311"},{label: "铜仁市", value: "312"},{label: "黔西南布依族苗族自治州", value: "313"},{label: "黔东南苗族侗族自治州", value: "314"},{label: "黔南布依族苗族自治州", value: "315"}]},
				{label: "云南省", value: 26,children:[{label: "昆明市", value: "316"}, {label: "曲靖市", value: "317"}, {label: "玉溪市", value: "318"},{label: "保山市", value: "319"},{label: "昭通市", value: "320"},{label: "丽江市", value: "321"},{label: "普洱市", value: "322"},{label: "临沧市", value: "323"},{label: "楚雄彝族自治州", value: "324"},{label: "红河哈尼族彝族自治州", value: "325"},{label: "文山壮族苗族自治州", value: "326"},{label: "西双版纳傣族自治州", value: "327"},{label: "大理白族自治州", value: "328"},{label: "德宏傣族景颇族自治州", value: "329"},{label: "怒江傈僳族自治州", value: "330"},{label: "迪庆藏族自治州", value: "331"}]},
				{label: "西藏自治区", value: 27,children:[{label: "拉萨市", value: "332"}, {label: "昌都地区", value: "333"}, {label: "山南地区", value: "334"},{label: "日喀则地区", value: "335"},{label: "那曲地区", value: "336"},{label: "阿里地区", value: "337"},{label: "林芝地区", value: "338"}]},
				{label: "陕西省", value: 28,children:[{label: "西安市", value: "339"}, {label: "铜川市", value: "340"}, {label: "宝鸡市", value: "341"},{label: "咸阳市", value: "342"},{label: "渭南市", value: "343"},{label: "延安市", value: "344"},{label: "汉中市", value: "345"},{label: "榆林市", value: "346"},{label: "安康市", value: "347"},{label: "商洛市", value: "348"}]},
				{label: "甘肃省", value: 29,children:[{label: "兰州市", value: "349"}, {label: "嘉峪关市", value: "350"}, {label: "金昌市", value: "351"},{label: "白银市", value: "352"},{label: "天水市", value: "353"},{label: "武威市", value: "354"},{label: "张掖市", value: "355"},{label: "平凉市", value: "356"},{label: "酒泉市", value: "357"},{label: "庆阳市", value: "358"},{label: "定西市", value: "359"},{label: "陇南市", value: "360"},{label: "临夏回族自治州", value: "361"},{label: "甘南藏族自治州", value: "362"}]},
				{label: "青海省", value: 30,children:[{label: "西宁市", value: "363"}, {label: "海东市", value: "364"}, {label: "海北藏族自治州", value: "365"},{label: "黄南藏族自治州", value: "366"},{label: "海南藏族自治州", value: "367"},{label: "果洛藏族自治州", value: "368"},{label: "玉树藏族自治州", value: "369"},{label: "海西蒙古族藏族自治州", value: "370"}]},
				{label: "宁夏回族自治区", value: 31,children:[{label: "银川市", value: "371"}, {label: "石嘴山市", value: "372"}, {label: "吴忠市", value: "373"},{label: "固原市", value: "374"},{label: "中卫市", value: "375"}]},				
				{label: "新疆维吾尔自治区", value: 32,children:[{label: "乌鲁木齐市", value: "376"}, {label: "克拉玛依市", value: "377"}, {label: "吐鲁番地区", value: "378"},{label: "哈密地区", value: "379"},{label: "昌吉回族自治州", value: "380"},{label: "博尔塔拉蒙古自治州", value: "381"},{label: "巴音郭楞蒙古自治州", value: "382"},{label: "阿克苏地区", value: "383"},{label: "克孜勒苏柯尔克孜自治州", value: "384"},{label: "喀什地区", value: "385"},{label: "和田地区", value: "386"},{label: "伊犁哈萨克自治州", value: "387"},{label: "塔城地区", value: "388"},{label: "阿勒泰地区", value: "389"},{label: "石河子市", value: "390"},{label: "阿拉尔市", value: "391"},{label: "图木舒克市", value: "392"},{label: "五家渠市", value: "393"}]},
				{label: "香 港", value: 33, children: [{label: "香 港", value: "398"}]},
				{label: "澳门特别行政区", value: 34, children: [{label: "澳门特别行政区", value: "399"}]},
				{label: "台湾省", value: "35", children: [{label: "台湾省", value: "400"}]}
				]}
	},
	mounted(data){

		//  getIndustryList(data).then(res => {
		// 		// console.log(res.data)
		// 		var that = this;
		// 		that.arrdata = Object.values(res.data.select[0].option.name);
		// 		// for(var i = 0;i<arrdata.length;i++){
		// 		// 	 that.arrdata.push(res.data.select[0].option[i].name)
		// 		// }
    //   	console.log(that.arrdata);
		// });
				
				var that = this;
            wx.request({
						url:'https://qq.zhongyi9999.com/e/extend/api/index.php?m=info&c=class',
						data: {
							gprice:''
						},
						header: {
						'content-type': 'application/json' // 默认值
						},
						success(data){
							var hanyeList = data.data;
							var field = hanyeList.data.select[0].field
							var type = hanyeList.data.select[2].field
							console.log(field)
							console.log(type)
							var classid = wx.getStorageSync('classid')
							var userid = wx.getStorageSync('userid')
							var gprice = hanyeList.data.info.gprice
							// console.log(userid)
							that.userId = userid
							// console.log(that.userId)


							that.gprice = gprice;

							that.selectArray = hanyeList.data.select[0].option;
							// that.cityArray = hanyeList.data.select[1].option;
							that.labelArray = hanyeList.data.select[2].option;
							// console.log(that.cityArray)
							console.log(that.selectArray)

							for(var k = 0; k<that.labelArray.length; k++){
								that.arrdata3.push(that.labelArray[k].name);
							}
						}
			})
	},
	methods:{
	  Upfile(e){
				var that = this
				wx.chooseImage({
				count: 1, 
				sizeType: ['compressed'], 
				sourceType: ['album', 'camera'], 
				success: function (res) {
					var tempFilePaths = res.tempFilePaths;
					upload(that, tempFilePaths);
				}
		})
		
		function upload(page, path,data) {
			wx.showToast({
				icon: "loading",
				title: "正在上传"
			}),
				wx.uploadFile({
					url: 'https://qq.zhongyi9999.com/e/extend/api/index.php?m=upload&c=image',
					filePath: path[0], 
					name: 'file',
					header: { "Content-Type": "multipart/form-data" },
					formData: {
						user: 'test',
					},
					success: function (res) {
						var Da = res.data
						var img = JSON.parse(Da).data
						let status = JSON.parse(Da).status
						if (status != 1) { 
							wx.showModal({
								title: '提示',
								content: '上传失败',
								showCancel: false
							})
							return;
						}
							that.imgleft = img
					},
					fail: function (e) {
						console.log(e);
						wx.showModal({
							title: '提示',
							content: '上传失败',
							showCancel: false
						})
					},
					complete: function () {
						wx.hideToast();  //隐藏Toast
					}
				})
		}
		},
		 Upfile1(e){
				var that = this
				wx.chooseImage({
				count: 1,
				sizeType: ['compressed'], 
				sourceType: ['album', 'camera'], 
				success: function (res) {
					var tempFilePaths = res.tempFilePaths;
					upload(that, tempFilePaths);
				}
		})
		
		function upload(page, path) {
			wx.showToast({
				icon: "loading",
				title: "正在上传"
			}),
				wx.uploadFile({
					url: 'https://qq.zhongyi9999.com/e/extend/api/index.php?m=upload&c=image',
					filePath: path[0], 
					name: 'file',
					header: { "Content-Type": "multipart/form-data" },
					formData: {
						user: 'test',
					},
					success: function (res) {
						var Da = res.data
						let img = JSON.parse(Da).data
						let status = JSON.parse(Da).status
						if (status != 1) { 
							wx.showModal({
								title: '提示',
								content: '上传失败',
								showCancel: false
							})
							return;
						}
							that.imgright = img
					},
					fail: function (e) {
						console.log(e);
						wx.showModal({
							title: '提示',
							content: '上传失败',
							showCancel: false
						})
					},
					complete: function () {
						wx.hideToast();  //隐藏Toast
					}
				})
		}
		},
		getPickerList3(e){
			var that = this;
			that.value3 = parseInt(e.mp.detail.value)+1;
			var V3 = that.value3
			that.Vs = V3
			console.log(V3)
		},
		 // 单列
    showSinglePicker() {
			this.thisIndex = 1
      this.pickerValueArray = this.pickerSingleArray;
      this.mode = 'selector';
      this.pickerValueDefault = [];
      this.$refs.mpvuePicker.show();
      this.themeColor = '#247FF6';
    },
		
		//地区二级联动方法
		onChange(e) {
					var that = this;
					var cityValue = e.value[1];
					var selectValue = e.value[0];
					that.SelectValue = selectValue
					that.CityValue = cityValue
					console.log(cityValue);
					console.log(selectValue);
					
		},
		onCancel(e) {
			console.log(e);
		},
		// 二级联动选择
		showMulLinkageTwoPicker() {
			this.thisIndex = 2
			this.pickerValueArray = this.mulLinkageTwoPicker;
			this.mode = 'multiLinkageSelector';
			this.deepLength = 2;
			this.pickerValueDefault = [1, 0];
			this.themeColor = '';
			this.$refs.mpvuePicker.show();
		},
		showPickerView() {
			this.$refs.mpvuePicker.show();
		},
		onConfirm(e) {
			console.log(e);
			if (this.thisIndex == 1) {
        this.pickerText2 = e.label
      }
			if (this.mode === 'selector') {
				// this.pickerText = e.label;
			} else if (this.mode === 'dateSelector') {
				this.pickerText = e.label;
			} else if (this.mode === 'timeSelector') {
				this.pickerText = e.label;
			} else if (this.mode === 'multiSelector') {
				this.pickerText = e.label;
			} else if (
				this.mode === 'multiLinkageSelector' &&
				this.deepLength === 2
			) {
				this.pickerText = e.label;
			} else if (
				this.mode === 'multiLinkageSelector' &&
				this.deepLength === 3
			) {
				this.pickerText = e.label;
			}
			},
			WechatName(e){
				 var that = this;
				 var WechatName = e.mp.detail.value
				 that.Wn = WechatName
				 console.log(WechatName)
			},
			WechatID(e){
				 var that = this;
				 var WechatID = e.mp.detail.value
				 that.Wd = WechatID
			},
			introduction(e){
				 var that = this;
				 var introduction = e.mp.detail.value
				 console.log(introduction)
				 that.Ind = introduction

				var that = this;
				var UserId = that.userId
				var Sv = that.SelectValue
				var Cty = that.CityValue
				var VS = that.Vs
				var WD = that.Wd
				var WN = that.Wn
				var Indct = that.Ind
				var titlepic = that.imgleft
				var ewm = that.imgright

				if(Cty == "" || VS == "" || WN == ""  || titlepic == "" || ewm == ""){
							wx.showToast({
								title: '请核对',
								icon: 'loading',
								duration: 1000
						})
				}else{
					    var that = this
						  that.ismale = false;
				}
			},
			release(res){
				var that = this;
				var UserId = that.userId
				var Sv = that.SelectValue
				var Cty = that.CityValue
				var VS = that.Vs
				var WD = that.Wd
				var WN = that.Wn
				var Indct = that.Ind
				var titlepic = that.imgleft
				var ewm = that.imgright
				console.log(1111111)
				console.log(Cty)
				console.log(VS)
				console.log(Indct)
				console.log(titlepic)
				console.log(ewm)
					if(Cty == "" || VS == "" || WN == ""  || titlepic == "" || ewm == ""){
							wx.showToast({
								title: '请核对',
								icon: 'loading',
								duration: 1000
						})
				}else{
							wx.request({
							url:'https://qq.zhongyi9999.com/e/extend/api/index.php?m=class&c=release',
						  data: {
								 classid:1,
								 userid:UserId,
								 industry:11,
								 city:Cty,
								 weixin:WD,
								 type:1,
								 title:"技术探讨群",
								 smalltext:"测试测试测试测试测试测试测试测试测试测试测试测试测",
								 titlepic:titlepic,
								 ewm:ewm
								 },
								 header: {
											'content-type': 'application/x-www-form-urlencoded' // 默认值
								 },
								 method:'post',
									success(data){
												wx.navigateTo({	
													url: "../../pages/myrelease/main"
												});
											}
											
							})
					}
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

/* //地区联动样式 */
.page-hd {
  padding: 40px;
}
.page-title {
  font-size: 20px;
  font-weight: 400px;
}
.page-bd {
  padding: 15px;
}
.picker-text,
.page__desc {
  margin-top: 10px;
}
button {
  margin-top: 15px;
}

</style>
