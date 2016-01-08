$(function(){
	var page = new LAPP.Page();
	page.config({
		jsbase : '../../../',
        cssbase : '../../../' 
	});
	page.Ready(function( loginInfo ){
		var op={
			Layout: {
                 show: true,
                 render: "body",
                 id : "layout1",
                 ele:[ 
                     {"LAPP-header":{top: 0,height:50, show : true}},
                     {attach:{top: 51,height:128, show : true, cls : "attach", animation : "slide"}},
                     {mapPage:{top: 51,height:'auto', show : true, animation : "slide"}}
                     ]
            },
            Toolbar: {
               	 show: true,
                 render: "LAPP-header",
                 id : "toolbar",
                 ele:[{type: 'back', text: '返回',show: true},
                      {type:'title',text: 'Progress',show: true}]
            },
            ProgressBar: {
            	show: true,
            	render: "mapPage",
            	id : "progressBar",
            	liHeight : 90,
                cls : 'LAPP-progressBar-purple',   // LAPP-progressBar-purple(紫色) LAPP-progressBar-orange(橙色)   默认不写为蓝色 或者自定class
            	ele : {
				     beginData : '2015-3-2',// 时间跨度必须小于获得等于两个月,  （yearMonth不存在的情况下）如果为空则以当前日期计算
                    // endData : '2015-8-6', // （yearMonth不存在的情况下）如果为空则以beginData开始向后加60天
                    // defaultData : '2015-3-5', // 默认选中是那天 如果为空的话则选中的是当前天数
                    yearMonth : '2015-3'        // 设置一个月份格式YYYY-M (beginData和endData必须不存在的时候才生效) 
            	},
            }

		}
		page.setOptions(op,'Progressbar','Progressbar');
	});
});