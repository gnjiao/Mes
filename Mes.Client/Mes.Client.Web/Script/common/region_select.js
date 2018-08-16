﻿var citydata = [{ province: '北京', city: ['北京'], provid: 4 }, { province: '天津', city: ['天津', '塘沽区'], provid: 5 }, { province: '河北', city: ["邯郸", "衡水", "石家庄", "邢台", "张家口", "承德", "秦皇岛", "廊坊", "唐山", "保定", "沧州"], provid: 6 }, { province: '山西', city: ["长治", "晋中", "朔州", "大同", "吕梁", "忻州", "太原", "阳泉", "临汾", "运城", "晋城", "五台山"], provid: 8 }, { province: '内蒙古', city: ["呼伦贝尔", "兴安盟", "锡林郭勒盟", "巴彦淖尔盟", "包头", "呼和浩特", "锡林浩特", "通辽", "赤峰", "乌海", "鄂尔多斯", "乌兰察布市"], provid: 10 }, { province: '辽宁', city: ["葫芦岛", "盘锦", "辽阳", "铁岭", "阜新", "朝阳", "锦州", "鞍山", "沈阳", "本溪", "抚顺", "营口", "丹东", "瓦房店", "大连"], provid: 3 }, { province: '吉林', city: ["辽源", "通化", "白城", "松原", "长春", "吉林市", "桦甸", "延边朝鲜族自治州", "集安", "白山", "四平"], provid: 2 }, { province: '黑龙江', city: ["大兴安岭", "黑河", "齐齐哈尔", "绥化", "鹤岗", "佳木斯", "伊春", "双鸭山", "哈尔滨", "鸡西", "漠河", "大庆", "七台河", "牡丹江", "绥芬河"], provid: 1 }, { province: '上海', city: ['上海'], provid: 23 }, { province: '江苏', city: ["无锡", "苏州", "盱眙", "赣榆", "东台", "高邮", "镇江", "泰州", "宿迁", "徐州", "连云港", "淮安", "南京", "扬州", "盐城", "南通", "常州"], provid: 22 }, { province: '浙江', city: ["湖州", "嵊州", "平湖", "石浦", "宁海", "洞头", "舟山", "杭州", "嘉兴", "定海", "金华", "绍兴", "宁波", "衢州", "丽水", "台州", "温州"], provid: 24 }, { province: '安徽', city: ["淮南", "马鞍山", "淮北", "铜陵", "滁州", "巢湖", "池州", "宣城", "亳州", "宿州", "阜阳", "六安", "蚌埠", "合肥", "芜湖", "安庆", "黄山"], provid: 21 }, { province: '福建', city: ["莆田", "浦城", "南平", "宁德", "福州", "龙岩", "三明", "泉州", "漳州", "厦门"], provid: 27 }, { province: '江西', city: ["庐山", "玉山", "贵溪", "广昌", "萍乡", "新余", "宜春", "赣州", "九江", "景德镇", "南昌", "鹰潭", "上饶", "抚州"], provid: 26 }, { province: '山东', city: ["德州", "滨州", "烟台", "聊城", "济南", "泰安", "淄博", "潍坊", "青岛", "济宁", "日照", "泰山", "枣庄", "东营", "威海", "莱芜", "临沂", "菏泽"], provid: 7 }, { province: '河南', city: ["安阳", "三门峡", "郑州", "南阳", "周口", "驻马店", "信阳", "开封", "洛阳", "平顶山", "焦作", "鹤壁", "新乡", "濮阳", "许昌", "漯河", "商丘", "济源"], provid: 19 }, { province: '湖北', city: ["襄樊", "宜昌", "荆门", "荆州", "黄冈", "恩施土家族苗族自治州", "武汉", "黄石", "鄂州", "孝感", "咸宁", "随州", "仙桃", "天门", "潜江", "神农架"], provid: 18 }, { province: '湖南', city: ["张家界", "岳阳", "怀化", "长沙", "邵阳", "益阳", "郴州", "桑植", "沅陵", "南岳", "株洲", "湘潭", "衡阳", "娄底", "常德"], provid: 25 }, { province: '广东', city: ["南雄", "韶关", "清远", "梅州", "肇庆", "广州", "惠州", "河源", "汕头", "深圳", "汕尾", "湛江", "阳江", "茂名", "佛冈", "梅县", "电白", "高要", "珠海", "佛山", "江门", "东莞", "中山", "潮州", "揭阳", "云浮"], provid: 30 }, { province: '广西', city: ["桂林", "河池", "柳州", "百色", "贵港", "梧州", "南宁", "钦州", "北海", "防城港", "玉林", "贺州", "来宾", "崇左"], provid: 31 }, { province: '海南', city: ["海口", "三亚", "屯昌", "琼海", "儋州", "文昌", "万宁", "东方", "澄迈", "定安", "临高", "白沙黎族自治县昌", "乐东黎族自治县", "陵水黎族自治县", "保亭黎族苗族自治县", "琼中黎族苗族自治县"], provid: 32 }, { province: '重庆', city: ["奉节", "重庆", "涪陵"], provid: 17 }, { province: '四川', city: ["甘孜藏族自治州", "阿坝藏族羌族自治州", "成都", "绵阳", "雅安", "峨眉山", "乐山", "宜宾", "巴中", "达州", "遂宁", "南充", "泸州", "自贡", "攀枝花", "德阳", "广元", "内江", "广安", "眉山", "资阳", "凉山彝族自治州"], provid: 16 }, { province: '贵州', city: ["毕节", "遵义", "铜仁", "安顺", "贵阳", "黔西南布依族苗族自治州", "六盘水"], provid: 28 }, { province: '云南', city: ["昭通", "丽江", "曲靖", "保山", "大理白族自治州", "楚雄彝族自治州", "昆明", "瑞丽", "玉溪", "临沧", "思茅", "红河哈尼族彝族自治州", "文山壮族苗族自治州", "西双版纳傣族自治州", "德宏傣族景颇族自治州", "怒江僳僳族自治区"], provid: 29 }, { province: '西藏', city: ["那曲", "日喀则", "拉萨", "山南", "阿里", "昌都", "林芝"], provid: 15 }, { province: '陕西', city: ["榆林", "延安", "西安", "渭南", "汉中", "商洛", "安康", "铜川", "宝鸡", "咸阳"], provid: 9 }, { province: '甘肃', city: ["张掖", "金昌", "武威", "兰州", "白银", "定西", "平凉", "庆阳", "甘南", "临夏", "天水", "嘉峪关", "酒泉", "陇南"], provid: 12 }, { province: '青海', city: ["海北藏族自治州", "海南藏族自治州", "西宁", "玉树藏族自治州", "黄南藏族自治州", "果洛藏族自治州", "海西蒙古族藏族自治州", "海东"], provid: 13 }, { province: '宁夏', city: ["石嘴山", "银川", "吴忠", "固原"], provid: 11 }, { province: '新疆', city: ["昌吉回族自治州", "克孜勒苏柯尔克孜自治州", "伊犁哈萨克自治州", "阿拉尔", "克拉玛依", "博尔塔拉蒙古自治州", "乌鲁木齐", "吐鲁番", "阿克苏", "石河子", "喀什", "和田", "哈密", "奇台"], provid: 14 }, { province: '台湾', city: ['台湾'], provid: 20 }, { province: '香港', city: ['香港'], provid: 48 }, { province: '澳门', city: ['澳门'], provid: 49 }];