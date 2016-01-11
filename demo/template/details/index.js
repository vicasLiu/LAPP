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
   			url : "form.json",
   			service : "XEAM_INT_PKG"
        };
		var op = {
			DataCP : {
    			show : true,
    			id : "listDataCp",
    			subId : ["list2","iScroll"],
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
		           	{"panelpage": {top: 51,height: $(window).height()-50, show : true, animation : "slide"}}
		            
	          	]
    		},
    		Toolbar: {
			      	show: true,
			        render: "LAPP-header",
			        id : "toolbar",
			        ele:[
			        	{type:'title',text: '详情',show: true},
					 	{type: 'back', text: '返回',show: true},
					 	{type: 'submite', text: '菜单',show: true,status:["formop"]}
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
				subId: ['remarkPanel',"tab","baseForm","basic-info","investigate-Form","asessment"]
			},
			Menu: {
				show: false,
                render: 'body', 
                id: 'menu',
                cls : 'LAPP-component-up-dow-columns',
                ele: [
                    {cls: 'icon1', text: '扫描',value: '1234',defaultSelect:true},
                    {cls: 'icon2',text: '还是扫描',value: '123',fn:function(val){alert(val)}},
                    {cls: 'icon3',text: '依旧扫描',value: '1235'}
                ],
                divStyle:'right:5px;top:50;display:none',
                events : {
                    el : "#menu",
                    evt : {
                        "click .icon1" : "scan"
                    },
                    handle : {
                        scan : function( p ) {
                            alert(p.current.text());
                        }
                    }
                }
			},
			Panel:{
		        show: true,
		        id: 'remarkPanel',
		        render: "panelpage",
		        ele :'<div id="formpage" style="position:relative; height: auto;margin-bottom: 12px;width:100%;">'+
		        		'<div id="formpage-L" style="width:100px;float:left;">意向客户</div>'+
		        		'<div id="formpage-R" style="overflow:hidden;width:auto"></div>'+
		        	  '</div>'+
			          
			          '<div id="tabpage" style="clear:both;position:relative; height: auto;margin-bottom: 12px;"></div>'+
			    	  '<div id="basic-info" style="clear:both;position:relative; height: auto;margin-bottom: 12px;display:none">'+
			    	  '</div>'+
			    	  '<div id="call-tel" style="clear:both;position:relative; height: auto;margin-bottom: 12px;display:none">'+
			    	  	'<div id="call-tel-form" style="height: auto;"></div><div id="add-investigate" style="height:30px;line-height:30px;"><a>添加电话沟通结果</a></div><div id="call-tel-btn"></div>'+
			    	  	'<div style="height:40px;line-height:40px;margin-bottom:20px;"><a>不合格</a><a>继续跟进</a></div>'+
			    	  '</div>'+
			    	  '<div id="investigate" style="clear:both;position:relative; height: auto;margin-bottom: 12px;">'+
			    	  '<div id="investigate-info"></div><div id="investigate-btn"></div>'+
			    	  '<div style="height:40px;line-height:40px;margin-bottom:20px;"><a>不合格</a><a>提交审核</a></div>'+
			    	  '</div>'+
			    	  '<div id="asessment" style="clear:both;position:relative; height: auto;margin-bottom: 12px;display:none"></div>'
			},   	
    		Form: [{
					show: true,
					render: 'formpage-R',
					id : "baseForm",
					isHideTitle: [false,false,false],
					edit : 'notEdit',// 可以编辑全部(allEditors) 部分能编辑(partEditors) 全部不能编辑(notEdit)
					subId : ["iScroll", "listDataCp"],
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
				                title : {key:'title',value:'栏目1',show:false},
				                isTogglepanel : false,  // 是否可以切换
				                data : [
					                {id:"name",label:'姓名:',labelCls:'',field:'name',type:'inputText',orderId:"orderId",groupId:"groupId",value: 'XXXXX',edit:true,fn:function(data){
					                    return "3333";
					                }},
					                {id:"sex",label:'性别:',labelCls:'',field:'sex',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '男',edit:false},
					                {id:"tel",label:'手机:',labelCls:'',field:'tel',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '186********',edit:false},
					                {id:"address",label:'地区:',labelCls:'',field:'address',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '浙江->宁波->慈溪',edit:false},
					                {id:"infro",label:'信息来源:',labelCls:'',field:'sex',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '扫街获取',edit:false},
					                {id:"companyName",label:'公司名称:',labelCls:'',field:'companyName',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: 'XXXXXXXXXX',edit:false},
					                {id:"companyAddress",label:'公司地址:',labelCls:'',field:'companyAddress',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: 'XXXXXXXXXXXXXX',edit:false}
					            ]
				            }
					    ]
				},
				// 基本信息
				{
					show: true,
					render: 'basic-info',
					id : "info-Form",
					isHideTitle: [false,false,false],
					edit : 'notEdit',// 可以编辑全部(allEditors) 部分能编辑(partEditors) 全部不能编辑(notEdit)
					subId : ["iScroll", "listDataCp"],
					dbData:"detail",
					events : {
						evt : {
							"click #addressSelect1dir" : "addressSelect",
							"click #nameSelect" : "nameSelect"
						},
						handle : {
							addressSelect : function() {
								  page.setOptions(formop,"Formop", "详情", "formop");
							},
							nameSelect : function() {
								alert("店名选择！");
							}
						}
					},
			        data : [
					        {
				                title : {key:'title',value:'栏目1',show:false},
				                isTogglepanel : false,  // 是否可以切换
				                data : [
					                {id:"baseTel",label:'电话:',labelCls:'',field:'baseTel',type:'inputText',orderId:"orderId",groupId:"groupId",value: '0755-26412609',edit:true},
					                {id:"baseFax",label:'传真:',labelCls:'',field:'baseFax',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: 'xxxxxxxxx',edit:false},
					                {id:"baseCode",label:'邮编:',labelCls:'',field:'baseCode',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '518060',edit:false},
					                {id:"baseEmail",label:'电子邮件/QQ:',labelCls:'',field:'baseEmail',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: 'khem@kingnode.com',edit:false},
					                {id:"baseAddress",label:'通讯地址:',labelCls:'',field:'baseAddress',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '浙江省宁波市慈溪杭州湾',edit:false},

					                {id:"baseIsExperience",label:'是否有相关从业经验:',labelCls:'',field:'sex',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '是',edit:false},
					                {id:"baseIndustry",label:'目前从事行业:',labelCls:'',field:'baseIndustry',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '建材',edit:false},
					                {id:"baseCompanyAddress",label:'目标地区人口:',labelCls:'',field:'baseCompanyAddress',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '100万',edit:false},
					                {id:"baseCounty",label:'百强县:',labelCls:'',field:'baseCounty',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '是',edit:false},
					                {id:"baseYearIncome",label:'年人均收入:',labelCls:'',field:'baseYearIncome',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '72.000元',edit:false},
					                {id:"baseMonthIncome",label:'月人均收入:',labelCls:'',field:'baseCounty',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '6000元',edit:false},
					                {id:"baseCabinets",label:'是否有厨柜集中区:',labelCls:'',field:'baseCounty',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '是',edit:false},
					                {id:"baseShop",label:'是否有理想店面:',labelCls:'',field:'baseShop',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '是',edit:false},
					                {id:"baseCompetition",label:'主要竞争情况:',labelCls:'',field:'baseCompetition',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: 'XXXXX',edit:false},


					            ]
				            }
					    ]
				},
				// 实地考察
				{
					show: true,
					render: 'investigate-info',
					id : "investigate-Form",
					isHideTitle: [false,false,false],
					edit : 'allEditors',// 可以编辑全部(allEditors) 部分能编辑(partEditors) 全部不能编辑(notEdit)
					subId : ["iScroll", "listDataCp"],
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
				                title : {key:'title',value:'栏目1',show:false},
				                isTogglepanel : false,  // 是否可以切换
				                data : [
					                {id:"investigateThinking",label:'经营思路:',labelCls:'',field:'investigateThinking',type:'textarea',orderId:"orderId",groupId:"groupId",value: 'XXXXX',edit:true,placeholder: '带语音：请输入textarea',isVoice : false},
					                {id:"investigateExperience",label:'有无行业经验',labelCls:'ga',field:'address',type:'radio',orderId:"address",groupId:"address",edit:true,name : 'sex',value: '有',arr : ['有','无']},
					                {id:"tel",label:'手机:',labelCls:'',field:'tel',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '186********',edit:false},
					                {id:"address",label:'地区:',labelCls:'',field:'address',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '浙江->宁波->慈溪',edit:false,fn:function(data){
					                	return '浙江->宁波->慈溪';
					                }},
					                // {id:"infro",label:'信息来源:',labelCls:'',field:'sex',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '扫街获取',edit:false},
					                // {id:"companyName",label:'公司名称:',labelCls:'',field:'companyName',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: 'XXXXXXXXXX',edit:false},
					                // {id:"companyAddress",label:'公司地址:',labelCls:'',field:'companyAddress',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: 'XXXXXXXXXXXXXX',edit:false}
					            ]
				            }
					    ]
				},
				{
					show: true,
					render: 'asessment',
					id : "asessment-Form",
					isHideTitle: [false,false,false],
					edit : 'notEdit',// 可以编辑全部(allEditors) 部分能编辑(partEditors) 全部不能编辑(notEdit)
					subId : ["iScroll", "listDataCp"],
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
				                title : {key:'title',value:'意向加盟书',show:true},
				                isTogglepanel : false,  // 是否可以切换
				                data : [
					                {id:"asessmentContract",label:'签约人:',labelCls:'',field:'asessmentContract',type:'inputText',orderId:"orderId",groupId:"groupId",value: '田萌',edit:true,fn:function(data){
					                    //return "<div>XXXXXXXX</div>";
					                }},
					                {id:"asessmentIntention",label:'意向金(元):',labelCls:'',field:'asessmentIntention',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '30000',edit:false},
					                {id:"asessmentContract",label:'产品销售合同',labelCls:'',field:'asessmentContract',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: ' ',edit:false,fn:function(data){

					                }},
					                {id:"asessmentSigning",label:'签约人:',labelCls:'',field:'asessmentSigning',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '田萌',edit:false},
					                {id:"asessmentDate",label:'打款日期:',labelCls:'',field:'asessmentDate',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '2015-01-02',edit:false},
					                {id:"asessmentAuditContract",label:'合同是否审批完毕:',labelCls:'',field:'asessmentAuditContract',type:'inputText',orderId:"orderId1",groupId:"groupId1",value: '2015-01-02',edit:false}

					            ]
				            }
					    ]
				}
			],
			Tab : {
				show: true,
				id: 'tab',
                height : '40px',
				render: 'tabpage',
				ele: [ 
                    {key:"",value:"基本信息",status:true},
                    {key:"",value:"电话洽谈",status:false},
                    {key:"",value:"实地考察及资质评估",status:false},
                    {key:"",value:"合同",status:false}
                ],
                clickFn : function(status){
		        	if(status == "基本信息"){
	                    $("#basic-info").show();
	                    $("#call-tel").hide();
	                    $("#investigate").hide();
	                    $("#asessment").hide();
	                }else if(status == "电话洽谈"){
	                    $("#basic-info").hide();
	                    $("#call-tel").show();
	                    $("#investigate").hide();
	                    $("#asessment").hide();
	                   $("#panelpage").height(($(window).height()-50)+"px");
	                   page.refresh("iScroll");
	                }else if(status == "实地考察及资质评估"){
	                   $("#basic-info").hide();
	                    $("#call-tel").hide();
	                    $("#investigate").show();
	                    $("#asessment").hide();
	                    $("#panelpage").height(($(window).height()-50)+"px");
	                    page.refresh("iScroll");
	                }else if(status == "合同"){
	                   $("#basic-info").hide();
	                    $("#call-tel").hide();
	                    $("#investigate").hide();
	                    $("#asessment").show();
	                }
					 
                }
			},
			Grouping: {
					show: true,
					id: 'tel-info',
					liHeight: 45,
					subId : ["iScroll", "listDataCp"],
					render: "call-tel-form",
					dbData : "formData",
					data : {
			            title : {key:'title1',value:'标题1'},
			            data : [
			                {field : 'textlabel',cls:"icon1"},     // 第一个是设置label
			                {field : 'textRight'}
			            ]
			        },
				    formData :  [
				        {
				            title1:'第一次电话洽谈结果',
				            data : [
				                
				                {textRight:"2014-12-26 16:06:19",textlabel:'企业2'},
				                
				            ]
				        },
				        {
				            title1:'第二次电话洽谈结果',
				            data : [
				                {textRight:"2014-12-26 16:06:19",textlabel:'企业1'}
				            ]
				        }
				    ]
			}//,
			// buttonLayer: [{
			// 	show: true,
			// 	id: 'investigate-btnLayer',
			// 	render: "investigate-btn",
			// 	subId : ["iScroll", "listDataCp"],
			// 	ele: [	 {
			// 	            type: 'textIconUpLeft',  // text textIconUp(上) textIconRight(右) textIconBottom(下) textIconUpLeft(左)
			// 	            id: 'textOnly0',
			// 	            background : "#fff",
			// 	            color : "#000",
			// 	            fontSize : "14px",
			// 	            iconSize : "16px",
			// 	            iconColor : "#1AD15F",
			// 	            icon : '2665',    // 字体图标
			// 	            text: '不合格'
			// 	        },
			// 	        {
			// 	            type: 'textIconUpLeft',  // text textIconUp(上) textIconRight(右) textIconBottom(下) textIconUpLeft(左)
			// 	            id: 'textOnly1',
			// 	            background : "#fff",
			// 	            color : "#000",
			// 	            fontSize : "14px",
			// 	            iconSize : "16px",
			// 	            iconColor : "#478CD7",
			// 	            icon : '2666',    // 字体图标
			// 	            text: '提交审核'
			// 	        }
			// 		],
			// 		events : {
			// 			evt : {
			// 				"click #textOnly0" : "redClick",
			// 				"click #textOnly1" : "greenClick"
			// 			},
			// 			handle : {
			// 				redClick : function() {
			// 					alert("点击红色按钮");
			// 				},
			// 				greenClick : function() {
			// 					alert("点击绿色按钮");
			// 				}
			// 			}
			// 		}
			// },
			// {
			// 	show: true,
			// 	id: 'calltel-btnLayer',
			// 	render: "call-tel-btn",
			// 	subId : ["iScroll", "listDataCp"],
			// 	ele: [	 {
			// 	            type: 'textIconUpLeft',  // text textIconUp(上) textIconRight(右) textIconBottom(下) textIconUpLeft(左)
			// 	            id: 'textOnly0',
			// 	            background : "#fff",
			// 	            color : "#000",
			// 	            fontSize : "14px",
			// 	            iconSize : "16px",
			// 	            iconColor : "#1AD15F",
			// 	            icon : '2665',    // 字体图标
			// 	            text: '不合格'
			// 	        },
			// 	        {
			// 	            type: 'textIconUpLeft',  // text textIconUp(上) textIconRight(右) textIconBottom(下) textIconUpLeft(左)
			// 	            id: 'textOnly1',
			// 	            background : "#fff",
			// 	            color : "#000",
			// 	            fontSize : "14px",
			// 	            iconSize : "16px",
			// 	            iconColor : "#478CD7",
			// 	            icon : '2666',    // 字体图标
			// 	            text: '提交审核'
			// 	        }
			// 		],
			// 		events : {
			// 			evt : {
			// 				"click #textOnly0" : "redClick",
			// 				"click #textOnly1" : "greenClick"
			// 			},
			// 			handle : {
			// 				redClick : function() {
			// 					alert("点击红色按钮");
			// 				},
			// 				greenClick : function() {
			// 					alert("点击绿色按钮");
			// 				}
			// 			}
			// 		}
			// }]

		};

		page.setData(data);
    	page.setOptions(op, "LIST", "List", "list");
	});
});
