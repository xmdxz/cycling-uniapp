let utils = {
	/**
	 * @param {Object} apiJson
	 * 省市区三级联动接口转换成自己的格式
	 */
	apiJsonToOwnJson(apiJson) {
		let data = apiJson[0].districts
		let length = data.length
		let map = []
		for (let index = 0; index < length; index++) {
			let province = {}
			province.value = data[index].adcode
			province.label = data[index].name
			province.children = []
			let city = data[index].districts
			let cityLength = city.length
			for (let index = 0; index < cityLength; index++) {
				let cityOb = {}
				cityOb.value = city[index].adcode
				cityOb.label = city[index].name
				cityOb.children = []
				let district = city[index].districts
				let districtLength = district.length
				for (let index = 0; index < districtLength; index++) {
					let districtOb = {}
					districtOb.value = district[index].adcode
					districtOb.label = district[index].name
					cityOb.children.push(districtOb)
				}
				province.children.push(cityOb)
			}
			map.push(province)
		}
		return map
	},

	add(arg1, arg2) {
		let r1, r2, m, c;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch (e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch (e) {
			r2 = 0;
		}
		c = Math.abs(r1 - r2);
		m = Math.pow(10, Math.max(r1, r2));
		if (c > 0) {
			var cm = Math.pow(10, c);
			if (r1 > r2) {
				arg1 = Number(arg1.toString().replace(".", ""));
				arg2 = Number(arg2.toString().replace(".", "")) * cm;
			} else {
				arg1 = Number(arg1.toString().replace(".", "")) * cm;
				arg2 = Number(arg2.toString().replace(".", ""));
			}
		} else {
			arg1 = Number(arg1.toString().replace(".", ""));
			arg2 = Number(arg2.toString().replace(".", ""));
		}
		return (arg1 + arg2) / m;
	},
	sub(arg1, arg2) {
		let r1, r2, m, n;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch (e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch (e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
		n = (r1 >= r2) ? r1 : r2;
		return ((arg1 * m - arg2 * m) / m).toFixed(n);
	},
	mul(arg1, arg2) {
		let m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length;
		} catch (e) {}
		try {
			m += s2.split(".")[1].length;
		} catch (e) {}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	}
}

export default utils
