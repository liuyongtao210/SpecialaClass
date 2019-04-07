import ajaxSubmit from '../form/jquery-form.js'
import WeuiModel from '../weuiModel/weuiModel.js';
import $md5 from 'js-md5'
class Common {
	constructor() {
		this.userID = '';
		this.token = '';
		this.role = -1;
		this.SA_URL = ""; 
		this.WECHAT_APPID = "wxe034037e8bb6e1b3";
	}
	init() {
		console.log(WeuiModel)
		this.userID = this.getCookie("userId");
		this.token = this.getCookie("token");
		this.role = this.getCookie("role");
		//this.SA_URL = "http://my.saclass.com/businessService/centerCtrl/routeService.do"; //生产机
//		this.SA_URL = "http://192.168.1.235:8091/SAonline/centerCtrl/routeService.do"; //测试服务器235
		//this.SA_URL="http://192.168.1.115:8080/SAonline/centerCtrl/routeService.do";  //新晨
		//this.SA_URL="http://192.168.1.234/SAonline/centerCtrl/routeService.do"; //岳鹏
		//this.SA_URL="http://192.168.1.181:8080/SAonline/centerCtrl/routeService.do";//何翼
		this.SA_URL="http://192.168.1.233:8091/SAonline/centerCtrl/routeService.do";//再飞
		if(this.userID != null && this.token != null) {
			this.setCookie("userId", this.userID, 2);
			this.setCookie("token", this.token, 2);
		}
	}
	getNoCodeURL() {
		var search = location.search;
		var noCodeUrl;
		if(search == "") {
			noCodeUrl = location.href;
		} else {
			noCodeUrl = location.href.split("?")[0];
			var param = "";
			search = search.slice(1);
			var arr = search.split("&");
			for(var i = 0; i < arr.length; i++) {
				var tmparr = arr[i].split("=");
				if(tmparr[0] != "code" && tmparr[0] != "state") {
					param += arr[i] + "&";
				}
			}
			param = param.slice(0, -1);
			if(param != "") {
				noCodeUrl += "?" + param;
			}
		}
		return noCodeUrl;
	}
	showLoginQR() {
		//内嵌二维码方式：无需页面跳转
		var obj = new WxLogin({
			id: "wxQR",
			appid: WECHAT_APPID,
			scope: "snsapi_login",
			redirect_uri: encodeURIComponent(getNoCodeURL()),
			state: "STATE",
			style: "black", //white
			href: ""
		});
	}
	//检测是否为微信浏览器
	is_weixn() {
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	}
	//发送get请求-基于jquery
	request(serviceName, methodName, otherParam, successFunc, type, postdata, timeout) {
		var that = this;
		if(timeout == undefined) {
			timeout = 1000 * 60 * 2;
		}
		var urlStr = this.createURLStr(serviceName, methodName, otherParam);
		var ajaxConfig = {
			type: type == undefined ? "get" : type,
			url: urlStr,
			timeout: timeout,
			success: function(str) {
				var json = eval("(" + str + ")");
				if(json.code == 10099) {
					that.clearCookie("userId");
					that.clearCookie("token");
					that.userID = null;
					that.token = null;
					//WeuiModel.hideLoad();
					//WeuiModel.showAlert("当前登录已失效，请刷新页面重新登录", "", "", "");
				} else {
					if(successFunc != null) {
						successFunc(json);
					}
				}
			},
			complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
				　　　　
				if(status == 'timeout') { //超时,status还有success,error等值的情况
					　　　　　
					xhr.abort();
					xhr = null;　　　　　
					var data = {
						code: 1,
						msg: "请求超时,您当前网络状态不佳"
					};
					if(successFunc != null) {
						successFunc(data);
					}　　　　
				}　　
			},
			error: function() {
				var data = {
					code: 1,
					msg: "请求失败,未知错误"
				};
				if(successFunc != null) {
					successFunc(data);
				}
			}
		};
		if(postdata != undefined) {
			ajaxConfig.data = postdata;
		}
		var xhr = $.ajax(ajaxConfig);
		return xhr;
	}
	//创建请求的url
	createURLStr(serviceName, methodName, otherParam) {
		var data = {};
		data.sn = serviceName;
		data.mn = methodName;
		if(otherParam != null) {
			for(var key in otherParam) {
				data[key] = otherParam[key];
			}
		}
		data.sign = this.createMD5Sign(data);
		var str = this.createVarsStrByObj(data);
		var urlStr = this.SA_URL + "?" + str;
		return urlStr;
	}
	//MD5验证加密
	createMD5Sign(data) {
		var paramArr = [];
		for(var key in data) {
			if(key != "info") {
				paramArr.push({
					key: key,
					value: data[key]
				});
			}
		}
		paramArr.sort((a, b)=> {
			return a.key > b.key ? 1 : -1;
		});
		var md5 = "";
		for(var i = 0; i < paramArr.length; i++) {
			md5 += paramArr[i].value;
		}
		md5 += "6783c950bdbf40aeac52042a9206e0ba";
		md5 = $md5(md5);
		return md5;
	}
	//把对象转换为字符串拼接
	createVarsStrByObj(obj) {
		var str = "";
		for(var key in obj) {
			var encodeKeyValue = encodeURIComponent(obj[key]);
			str += key + "=" + encodeKeyValue + "&";
		}
		str = str.slice(0, str.length - 1);
		return str;
	}
	//js获取location.href的参数的方法
	getQuery(para) {
		var reg = new RegExp("(^|&)" + para + "=([^&]*)(&|$)");
		var search = decodeURIComponent(window.location.search);
		var r = search.substr(1).match(reg);
		if(r != null) {
			return unescape(r[2]);
		}
		return null;
	}
	replaceQuery(para, value) {
		var search = decodeURIComponent(window.location.search);
		if(search == "") {
			search = "?" + para + "=" + value;
		} else if(search.indexOf(para) == -1) {
			search += "&" + para + "=" + value
		} else {
			var reg = new RegExp(para + "=[^&]*");
			search = search.replace(reg, para + "=" + value);
		}
		return search;
	}
	//读取cookies
	getCookie(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg)) {
			return unescape(arr[2]);
		} else {
			return null;
		}
	}
	//写入N小时cookie
	setCookie(name, value, Hours) {
		var exp = new Date();
		exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	}
	//清除cookie  
	clearCookie(name) {
		this.setCookie(name, "", -1);
	}
	//派发事件
	dispatch(ele, type) {
		if(document.all) {
			// IE浏览器支持fireEvent方法
			ele.fireEvent('on' + type, evt)
		} else {
			// 其他标准浏览器使用dispatchEvent方法
			var evt = document.createEvent('HTMLEvents');
			// initEvent接受3个参数：
			// 事件类型，是否冒泡，是否阻止浏览器的默认行为
			evt.initEvent(type, true, true);
			ele.dispatchEvent(evt);
		}
	}
	//上传文件
	uploadFile(maxSize, successFunc, startuploadFunc, extention) {
		var form = $('<form method="post" enctype="multipart/form-data"></form>');
		var file = $('<input type="file" name="file" />');
		form.append(file);
		file.click();
		file.change(()=> {
			var filePath = file.value;
			var fileObj = file[0].files[0];
			var fileSizeM = fileObj.size / 1024 / 1024;
			if(extention != undefined && extention != "") {
				var earr = extention.split(",");
				var ext = fileObj.name.slice(fileObj.name.lastIndexOf(".") + 1);
				if(earr.indexOf(ext) == -1) {
					alert("文件格式只能是" + extention);
					return;
				}
			}
			if(fileSizeM > maxSize) {
				alert("文件大小不能超过" + maxSize + "M");
				return;
			}
			fileSizeM = fileSizeM.toFixed(1);
			if(startuploadFunc != null) {
				startuploadFunc();
			}
			this.formUpload(form[0], (json)=> {
				if(json.code == 0) {
					if(successFunc != null) {
						successFunc(json.fileName, json.url, fileObj.name);
					}
				} else {
					WeuiModel.showAlert(json.msg);
				}
			});
		});
	}
	formUpload(form, func) {
		var obj = {
			md5: "true"
		};
		var server_url = this.createURLStr("File", "upload", obj);
		form.action = server_url;
		console.log("上传文件...");
		$(form).ajaxSubmit({
			success: function(str) {
				console.log("上传成功！");
				var json = JSON.parse(str);
				if(func != null) {
					func(json);
				}
			}
		});
	}
	formatDateTime(timenumber, format) {
		if(timenumber == undefined || timenumber == null || timenumber == "" || isNaN(timenumber)) {
			return "INVAILED";
		}
		var adate = new Date(timenumber);
		var year = adate.getFullYear().toString();
		var month = (adate.getMonth() + 1).toString();
		var thedate = adate.getDate().toString();
		var hour = adate.getHours().toString();
		var minute = adate.getMinutes().toString();
		var second = adate.getSeconds().toString();
		month = month.length == 1 ? "0" + month : month;
		thedate = thedate.length == 1 ? "0" + thedate : thedate;
		hour = hour.length == 1 ? "0" + hour : hour;
		minute = minute.length == 1 ? "0" + minute : minute;
		second = second.length == 1 ? "0" + second : second;
		var YMD = year + "-" + month + "-" + thedate;
		var HMS = hour + ":" + minute + ":" + second;
		var HM = hour + ":" + minute;
		var YMD2 = year + "/" + month + "/" + thedate;
		switch(format) {
			case "Y-M-D":
				return YMD;
				break;
			case "Y/M/D":
				return YMD2;
				break;
			case "H:M:S":
				return HMS;
				break;
			case "H:M":
				return HM;
				break;
			case "Y-M-D H:M:S":
				return YMD + " " + HMS;
				break;
			case "Y/M/D H:M:S":
				return YMD2 + " " + HMS;
				break;
			case "Y-M-D H:M":
				return YMD + " " + HM;
				break;
			case "Y/M/D H:M":
				return YMD2 + " " + HM;
				break;
			default:
				return YMD + " " + HMS;
				break;
		}
	}
}
let commonObj = new Common();
commonObj.init();
export default commonObj
