define(function(require,exports,module){
 module.exports = {
    phone: function(phone){
        if(!/^(13[0-9]|15[0|1|2|3|6|7|8|9]|18[0-9]|177)\d{8}$/.test(phone)){
            return false;
        }
        return true;
    },
    //身份证
    card: function(card) {
        var l = 0;
        var i = card;
        var m = {11: "北京",12: "天津",13: "河北",14: "山西",15: "内蒙",21: "辽宁",22: "吉林",23: "黑龙",31: "上海",32: "江苏",33: "浙江",34: "安徽",35: "福建",36: "江西",37: "山东",41: "河南",42: "湖北",43: "湖南",44: "广东",45: "广西",46: "海南",50: "重庆",51: "四川",52: "贵州",53: "云南",54: "西藏",61: "陕西",62: "甘肃",63: "青海",64: "宁夏",65: "新疆",71: "台湾",81: "香港",82: "澳门",91: "国外"};
        if (!/^\d{17}(\d|x)$/i.test(i)) {
            return false
        }
        i = i.replace(/x$/i, "a");
        if (m[parseInt(i.substr(0, 2))] == null) {
            return false
        }
        var n = i.substr(6, 4) + "-" + Number(i.substr(10, 2)) + "-" + Number(i.substr(12, 2));
        var j = new Date(n.replace(/-/g, "/"));
        if (n != (j.getFullYear() + "-" + (j.getMonth() + 1) + "-" + j.getDate())) {
            return false
        }
        for (var d = 17; d >= 0; d--) {
            l += (Math.pow(2, d) % 11) * parseInt(i.charAt(17 - d), 11)
        }
        if (l % 11 != 1) {
            return false
        }
        return true;
    }
}
})