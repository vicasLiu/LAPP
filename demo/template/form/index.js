"use strict";

$(function(){
	var page = new LAPP.Page();
	page.config({
		jsbase : '../../../',
		cssbase : '../../../'
	});
	page.Ready(function( loginInfo ){
		var data = {
   			type : "rest",
   			to : "EBS",
   			url : "Jersey_WebClient/restRequest.jsp",
   			service : "XEAM_INT_PKG"
        };
		var op = {
			// DataCP : {
   //  			show : true,
   //  			id : "listDataCp",
   //  			subId : ["list2","iScroll"],
   //  			paging : {
   //  				"index" : "P_PAGE",
   //  				"count" : "P_PAGE_CNT"
   //  			},
   //  			dataParam : {
	  // 				"dataFun" : "P_TRANSFER_LIST",
			// 			"P_USER_NAME" : page.getLoginName(),
			// 			"P_PAGE" : "1",
			// 			"P_PAGE_CNT" : "30"
   //  			}
   //  		},
    		Layout : {
    			show : true,
    			render: "body",
	          	id : "layout1",
	          	ele:[

		            {"LAPP-header":{top: 0,height:50, show : true, animation : "slide"}},
		           	{"panelpage": {top: 51,height: 'auto', show : true, animation : "slide"}},
		            {"detailpage":{top: 51,height:'auto', show : true, animation : "slide"}}
	          	]
    		},
    		Toolbar: {
			      	show: true,
			        render: "LAPP-header",
			        id : "toolbar",
			        ele:[
			        	{type:'title',text: 'List',show: true},
					 	{type: 'back', text: '返回',show: true},
					 	{type: 'submite', text: '确认',show: true,status:["formop"]}
			      	],
			      	events : {
			      		evt :{
			      			"click .back" : "backClick"
			      		},
			      		handle : {
			      			backClick : function(){
			      				page.back();
			      			}
			      		}

			      	}
	        },
			iScroll : {
				show : true,
				render : "panelpage",
				id : "iScroll",
				subId: ['remarkPanel']
			},
			Panel:{
		        show: true,
		        id: 'remarkPanel',
		        render: "panelpage",
		        ele :'<div id="formpage" style="position:relative; height: auto;margin-bottom: 12px;"></div>'+
			          '<div id="tabpage" style="position:relative; height: auto;margin-bottom: 12px;"></div>'+
			          '<div id="tablepage" style="position:relative; height: auto;margin-bottom: 12px;"></div>'+
			    	  '<div id="cardpage" style="position:relative; height: auto;margin-bottom: 12px;display:none"></div>'+
		    		  '<div id="timelinepage" style="position:relative; height: auto;margin-bottom: 12px; display:none"></div>'
			},   	
    		Form: {
				show: true,
				render: 'formpage',
				id : "addShopForm",
				isHideTitle: [false,false,false],
				edit : 'allEditors',// 可以编辑全部(allEditors) 部分能编辑(partEditors) 全部不能编辑(notEdit)
				subId : ["list1", "dyList"],
				dbData:"detail",
				events : {
					evt : {
						"click #addressSelect1dir" : "addressSelect",
						"click #nameSelect" : "nameSelect"
					},
					handle : {
						addressSelect : function() {
							  page.setOptions(formop,"Formop", "详情", "formop")
						},
						nameSelect : function() {
							alert("店名选择！");
						}
					}
				},
		        data : [
				        {
			                title : {key:'title',value:'栏目1',show:true},
			                isTogglepanel : false,  // 是否可以切换
			                data : [
			                    {id:"addressSelect1",label:'地址',labelCls:'ga',field:'id',type:'select',orderId:"address",groupId:"address",value: '科技园联想大厦',edit:true},
			                    {id:"addressSelect2",label:'姓名',labelCls:'ga',field:'name',type:'inputText',orderId:"name",groupId:"groupId",value: '张三',edit:true,placeholder: '请输入名字'},
			                    {id:"addressSelect3",label:'电话',labelCls:'ga',field:'tel',type:'number',orderId:"tel",groupId:"groupId",value: '13333333333',edit:true,placeholder: '请输入电话'},
			                    {id:"addressSelect4",label:'email',labelCls:'ga',field:'email',type:'inputText',orderId:"email",groupId:"groupId",value: '1234567@qq.com',edit:true,placeholder: '请输入email'},
			                ]
			            }
				    ]
			},
			Tab : {
				show: true,
				id: 'tab',
                height : '40px',
				render: 'tabpage',
				ele: [ 
                    {key:"",value:"未处理",status:true},
                    {key:"",value:"已处理",status:false},
                    {key:"",value:"处理中",status:false}
                ],
                clickFn : function(status){
		        	if(status == "未处理"){
	                    $("#tablepage").show();
	                    $("#cardpage").hide();
	                    $("#timelinepage").hide();
	                }else if(status == "已处理"){
	                    $("#tablepage").hide();
	                    $("#cardpage").show();
	                    $("#timelinepage").hide();
	                }else if(status == "处理中"){
	                   $("#tablepage").hide();
	                    $("#cardpage").hide();
	                    $("#timelinepage").show();
	                }
					page.refresh("iScroll");
                }
			},
			Table : {
				show: true,
                id: 'table',
                render: 'tablepage',
                //dbData : "formData",
                data: {
                    // tPercent : ["40%","35%","25%"],
                    // tHead : [
                    //     {label:'最佳客户',field:'xx21'}
                    // ],
                    tBody : [
                        {label : '姓名' , field : 'name'},
                        {label : '年龄' , field : 'age'},
                        {label : '百分比' , field : 'number'}
                    ],
                    tFooter: [
                        {label: '总计',field : 'gaga'}
                    ]
                },
                formData : {
                    // tHead : [
                    //     {xx:'详情1'},
                    //     {xx:'详情2'}
                    // ],
                    tBody : [
                        {name:'李四',age:'35',number:'30.00%'},
                        {name:'黎明',age:'30',number:'10.00%'},
                        {name:'吴王',age:'33',number:'30.00%'}
                    ],
                    tFooter : [
                        {gaga : '1400万元'}
                    ]  
                }
                // data: [
                //         {
                //             // tPercent : ["40%","35%","25%"],
                //             tHead : ["最佳客户","金额(:万元)","百分比"],
                //             tBody : [
                //                 ["心花怒放电影","13213211","80.00%"],
                //                 ["智取威虎山电影","13213211","80.00%"],
                //                 ["星际穿越电影","13213211","80.00%"],
                //                 ["狂怒电影","13213211","80.00%"],
                //                 ["四大名捕电影","13213211","80.00%"],
                //             ],
                //             tFooter: [
                //                 {label: '出差人员',field : '10000元'}
                //             ]
                //         }
                //     ] 
			},
			Card : {
                show: true,
					id: 'list2',
					subId : ["iScroll","listDataCp"],
					render: "cardpage",
					dbData : "formData",
					isIcon : false,  // 是否需要图标
					data : {
			             head : [
			                { label : '合计' , field : 'field' }
			            ],
			            title : { label : '费用统计' , field : 'sss1' },
			            list : [
			                { label : '出发地' , field : 'address1',fn:function(data){
			                    return '<label>发货单号:军方基地</label><span>确认订单</span>';
			                } },
			                { label : '目的地' , field : 'address2' },
			                { label : '开始日期' ,cls:'1321' },
			                { label : '金额' , field : 'address4' }
			            ],
			            footer : [
			                { label : '金额' , field : 'address5' }
			            ]
			        },
			     //    componentData : {
				    //      head : [
					   //          { field : '100000000.00' }
					   //      ],
					   //      title : [{ sss : '费用统计1' },{ sss : '费用统计2' }],
					   //      list : [
					   //          [
					   //              { address1 : '深圳111',address2 : '北极',address3 : '2015-5-1',address4 : '1000000000' },
					   //              // { address1 : '深圳',address2 : '南极',address3 : '2015-10-1',address4 : '1000000' }
					   //          ],
					   //          [
					   //              { address1 : '深圳111',address2 : '北极',address3 : '2015-5-1',address4 : '1000000000' },
					   //              { address1 : '深圳',address2 : '南极',address3 : '2015-10-1',address4 : '1000000' }
					   //          ]
					   //      ],
					   //      footer : [
					   //          { address5 : '100000000.00' }
					   //      ]
				    // }
			},
			Timeline : {
				show: true,
				id: 'timeline',
				render: "timelinepage",     
				subId: ['listDataCp'],  
                data :[
                    {time : "今天",description : "2 个消息",list : ["祝您生日快乐，请到人事部领取生日礼物。","祝您生日快乐，请到人事部领取生日礼物。"]},

                    {time : "05-01-05",description : "2 个消息",list : ["祝您生日快乐，请到人事部领取生日礼物。","祝您生日快乐，请到人事部领取生日礼物。"]}
			     ]
			}
		};

		var formop = {
			DataCP : {
    			show : true,
    			id : "formDataCp2",
    			subId : ["addShopForm2","iScrol2"],
    			 
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
    		iScroll : {
				show : true,
				render : "detailpage",
				id : "iScroll2",
				subId: ['addShopForm2']
			},
			Form: {
					show: true,
					render: 'detailpage',
					id : "addShopForm2",
					isHideTitle: [false,false,false],
					edit : 'allEditors',  // 可以编辑全部(allEditors) 部分能编辑(partEditors) 全部不能编辑(notEdit)
					subId : ["iScroll2", "formDataCp2"],
					dbData:"detail",
					events : {
						evt : {
							"click #addressSelect" : "addressSelect",
							"click #nameSelect" : "nameSelect"
						},
						handle : {
							addressSelect : function() {
								alert("地址选择！");
							},
							nameSelect : function() {
								alert("店名选择！");
							}
						}
					},
					 data : [
				        {
				            title : {key:'栏目1',value:'栏目1'},
				            isTogglepanel : true,
				            data : [
				                {
				                    show : true,
				                    title : {key:'货物1',value:'货物1'},
				                    data : [
				                        {id:"addressSelect1",label:'姓名',labelCls:'ga',field:'address1',type:'select',orderId:"address",groupId:"address",value: '张三',edit:true},
				                        {id:"addressSelect2",label:'电话',labelCls:'ga',field:'address2',type:'inputText',orderId:"address",groupId:"address",value: '13333333333',edit:true},
				                        {id:"addressSelect3",label:'地址',labelCls:'ga',field:'address3',type:'inputText',orderId:"address",groupId:"address",value: '联想大厦',edit:true},
				                        {id:"addressSelect4",label:'产品',labelCls:'ga',field:'address4',type:'inputText',orderId:"address",groupId:"address",value: 'gaga',edit:false,fn:function(data){
				                            return '西撒摄影作坊'
				                        }},
				                        {id:"addressSelec6t",label:'邮件',labelCls:'ga',field:'address6',type:'inputText',orderId:"address",groupId:"address",value: '1234@qq.com',edit:true}				                    ]
				                }
				            ]
				        }
				    ]
				}
		}
		page.setData(data);
    	page.setOptions(op, "LIST", "List", "list");
	});
});
