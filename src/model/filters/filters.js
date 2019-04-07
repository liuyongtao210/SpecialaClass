import Vue from 'vue'
Vue.filter('formatDate', (timenumber, format) => {
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
		case "MM/DD ss:mm":
			return YMD2 + " " + HM;
			break;
		default:
			return YMD + " " + HMS;
			break;
	}
})