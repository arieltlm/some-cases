define(function(require) {
var configProvince=[
	{
	name:'北京',
	alias:'beijing',
	geoCoordMap :{
					'东城区': [116.418757, 39.917544],
					'西城区': [116.366794, 39.915309],
					'海淀区': [116.24089, 40.037003],
					'朝阳区': [116.520254, 39.958671],
					'石景山区': [116.195445, 39.914601],
					'大兴区': [116.411441, 39.661251],
					'门头沟区': [115.808583, 40.030278],
					'昌平区': [116.235906, 40.218085],
					'通州区': [116.751709, 39.80526],
					'房山区': [115.845936, 39.744273],
					'丰台区': [116.271847, 39.857731],
					'顺义区': [116.741907, 40.164373],
					'怀柔区': [116.626967, 40.720368],
					'密云县': [116.987672, 40.542738],
					'延庆县': [116.189109, 40.559968],
					'平谷区': [117.164179, 40.237556],
				}
	},
	{
	name:'云南',
	alias:'yunnan',
	geoCoordMap:{}
	}
]
	return configProvince
})