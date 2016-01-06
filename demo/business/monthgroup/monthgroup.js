"use strict";

$(function(){
	var page = new LAPP.Page();
	page.config({
		base : '../../../../APP/',
		jsbase : '../../../',
		cssbase : '../../../'
	});
	page.Ready(function( loginInfo ){
		var _wid = $(window).width(),
    		_wid2 = (_wid/2 - 37)+'px',
    		_wid4 = (_wid/4 - 31)+'px';
    	var data = {
				type : "rest",
				to : "EBS",
				url : "monthgroup.json",
				service : "XEAM_INT_PKG"
			};
		var op = {
			DataCP : {
	    			show : true,
	    			id : "listDataCp",
	    			subId : ["MonthGroupLayer"],
	    			paging : {
	    				"index" : "P_PAGE",
	    				"count" : "P_PAGE_CNT"
	    			},
	    			dataParam : {
		  				"dataFun" : "P_TRANSFER_LIST",
							"P_USER_NAME" : page.getLoginName(),
							"P_PAGE" : "1",
							"P_PAGE_CNT" : "30"
	    			}
	    		},
			Layout : {
				show : true,
				render: "body",
				id : "layout1",
				ele:[
					{"LAPP-header":{top: 0,height:50, show : true, animation : "slide"}},
					{"listPage": {top: 51,height: 'auto', show : true, animation : "slide"}}

				]
			},
			Toolbar: {
				show: true,
				render: "LAPP-header",
				id : "toolbar",
				ele:[
					{type:'title',text: 'MonthGroup',show: true},
					{type:'back',text: '返回',show: true}
				]
			},
			MonthGroup: {
				show: true,
				id: 'MonthGroupLayer',
				render: "listPage",
				dbData:"data",
				subId:["listDataCp"],
				data : {
		            title : { key : 'title' , value : '2015' , show : true  },//, arr : [ 2015 , 2050 ]
		            data : [ 
		                [
		                    {id: 'textOnly0',width : (_wid - 42)+'px',field : 'Button0'},
		                    {id: 'textOnly1',width : _wid2,field : 'Button1',isSelected:true},
		                    {id: 'textOnly2',width : _wid2,field : 'Button2'},
		                    {id: 'textOnly3',width : _wid4,field : 'Button3',cls : 'Monthgroup-pd8'},
		                    {id: 'textOnly4',width : _wid4,field : 'Button4',cls : 'Monthgroup-pd8'},
		                    {id: 'textOnly5',width : _wid4,field : 'Button5',cls : 'Monthgroup-pd8'},
		                    {id: 'textOnly6',width : _wid4,field : 'Button6',cls : 'Monthgroup-pd8'},
		                ],
		                [
		                    {id: 'Month1',width : _wid4,field : 'month1',cls : 'Monthgroup-pd8'},
		                    {id: 'Month2',width : _wid4,field : 'month2',cls : 'Monthgroup-pd8',isSelected:true},
		                    {id: 'Month3',width : _wid4,field : 'month3',cls : 'Monthgroup-pd8'},
		                    {id: 'Month4',width : _wid4,field : 'month4',cls : 'Monthgroup-pd8'},
		                    {id: 'Month5',width : _wid4,field : 'month5',cls : 'Monthgroup-pd8'},
		                    {id: 'Month6',width : _wid4,field : 'month6',cls : 'Monthgroup-pd8'},
		                    {id: 'Month7',width : _wid4,field : 'month7',cls : 'Monthgroup-pd8'},
		                    {id: 'Month8',width : _wid4,field : 'month8',cls : 'Monthgroup-pd8'},
		                    {id: 'Month9',width : _wid4,field : 'month9',cls : 'Monthgroup-pd8'},
		                    {id: 'Month10',width : _wid4,field : 'month10',cls : 'Monthgroup-pd8'},
		                    {id: 'Month11',width : _wid4,field : 'month11',cls : 'Monthgroup-pd8'},
		                    {id: 'Month12',width : _wid4,field : 'month12',cls : 'Monthgroup-pd8'}
		                ]
		            ],
		        },
		        events : {
						evt : {
							"click #Month1" : "Month1Click",
							"click #textOnly1" : "textOnly0Click"
						},
						handle : {
							Month1Click : function(p) {
								 
								alert($(p.current).text());
							},
							textOnly0Click : function(p) {
								
								alert($(p.current).text());
							}
						}
					}
			    // formData : {
			    //     title:'2016',
			    //     Button0 : '全年',
			    //     Button1 : '上半年',
			    //     Button2 : '下半年',
			    //     Button3 : '一季度',
			    //     Button4 : '二季度',
			    //     Button5 : '三季度',
			    //     Button6 : '四季度',
			    //     month1 : '一月',
			    //     month2 : '二月',
			    //     month3 : '三月',
			    //     month4 : '四月',
			    //     month5 : '五月',
			    //     month6 : '六月',
			    //     month7 : '七月',
			    //     month8 : '八月',
			    //     month9 : '九月',
			    //     month10 : '十月',
			    //     month11 : '十一月',
			    //     month12 : '十二月'
			    // }
			}
		};
		page.setData(data);
		page.setOptions(op, "LIST", "List", "list");
	});
});
