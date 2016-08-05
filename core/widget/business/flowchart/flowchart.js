/**
 * @File 流程图组件
 * @Import
 * @CreatedBy LAPP Mobile Components Development Group
 * @Module LAPP
 * @Date 2014-01-24
 */
"use strict";
if(!LAPP){
	var LAPP = {};
};
(function(window, undefined) {
	var dom = document, wwidth = dom.body.clientWidth, htm = ''
		,wheight = dom.body.clientHeight, flowchart, calculate = {}
		, allWidth, allHeight, oldTop = 0, oldLeft = 0, stepArray = []
		, nodeData = '', endTop, endLeft;
	flowchart = function( pointer ) {
		this.$pointer = pointer;
	}

	flowchart.prototype = {
		constructor : flowchart,
		init : function(options) {
            calculate={};
            htm="";
            stepArray=[];
            $("#"+options.render).empty();
            this.createDom(options.render);
            if(options.data){
                this.drawNode(options.data);
            }else{
                options.fn(this);
            }
            LAPP.Publisher.publish("businessWidgetLoaded", this);
		},
        getSubId : function() {
            return this.$pointer;
        },
        getActive : function() {
            return this.$active;
        },
        setActive : function( flg ) {
            this.$active = flg+"";
        },
        refreshPage:function(data){
            calculate={};
            htm="";
            stepArray=[];
            this.drawNode(data);
        },
		drawNode : function( data ) {
			var nodeHtml = '', nodeObj = {}, nodeName = [], nodeStep = '', nodetype = "", nodeId = ''
				, data = data || {}
				, eleNodeName = data.name, eleNodeType = data.type
				, boxShadow = ''
				, eleNode = data['node-data'];
				nodeData = eleNode;
			for( var i = 0 ; i < eleNode.length ; i++ ) {
				nodeObj = eleNode[i], nodeStep = nodeObj.seq, nodetype = nodeObj.type
				, nodeName = eleNode[i]['people-data']
				, nodeId = nodeObj.id
				, stepArray.push(nodeStep);

				if(nodeName.length > 0) {
					for( var j = 0 ; j < nodeName.length ; j++ ) {
						var obj = nodeName[j], cde = this.getXY({
							step : nodeStep,
							nodetype : nodetype,
							nodeId : nodeId,
							subIds : obj.id,
							formId : obj.formId,
							status : obj.status,
							index : j
						});

						boxShadow = ( obj.status == "0" ?
						              "box-shadow: -3px 3px 5px #F0D8DA,-3px -3px 5px #F0D8DA,3px -3px 5px #F0D8DA,3px 3px 5px #F0D8DA;" :
						              (obj.status == "-1") ?
						              "box-shadow: -3px 3px 5px #ddd,-3px -3px 5px #ddd,3px -3px 5px #ddd,3px 3px 5px #ddd;"
						              : "" );

						nodeHtml += '<div class="node '+(obj.status == "2"?"boder end actionNode1":"")+'" style="top : '+cde.top+'px;left : '+cde.left+'px;'+(obj.img == ""?"":"background:url("+obj.img+") no-repeat")+';background-size:76px 76px;'+boxShadow+'" id="'+obj.id+'">'+
										'<div class="status" style="background : url('+(obj.status == '1'?"../public/css/flowchart/yes.png":(obj.status == '0'?"../public/css/flowchart/no.png":""))+') no-repeat;background-size:32px 32px"></div>'+
										'<span class="name">'+obj.name+'</span>'+
										'<span class="node-name">'+obj.action+'</span>'+
									'</div>';
					}
				}
			}
			if(nodeHtml) {
				//画起点
				var obj = nodeName, cde = {};
					nodeHtml += '<div class="start" style="top : '+(endTop+150)+'px;left : '+(endLeft+15)+'px;">'+
									'<span class="start-name">end</span>'+
									'<span class="start-type">后置节点</span>'+
								'</div>';
//				 nodeHtml += '<div class="line" ' +
//								 		'	style="width:2px;' +
//								 		'	height:'+(20)+'px;' +
//								 		'	top:'+(endTop+125)+'px;' +
//								 		'	background:#bbb;'+
//								 		'	left:'+(endLeft+40)+'px;">' +
//								 		'&nbsp;</div>';
			}
			$("#flowchart").append( nodeHtml );

			this.iscorll('wrapper-flowChart');
			this.drawLine();
		},
		/**
		 * 画线
		 */
		drawLine : function() {
			var htm = ''
				, obj = ''
				, top = ''
				, left = ''
				, type = ''
				, id = ''
				, formId = ''
				, previousObj = ''
				, previousId = ''
				, previousFromId = ''
				, previousTop = ''
				, previousLeft = ''
				, bgColor = ''
                ;

			for( var i = stepArray.length - 1 ; i > 0 ; i-- ) {
				 obj = calculate[stepArray[i]];
				 previousObj = calculate[stepArray[i - 1]];
				 type = obj.type;
				 if( obj &&previousObj) {
					 for( var j = obj.nodes.length - 1 ; j >= 0 ; j-- ) {
						 formId = obj.nodes[j].formId;
						 top = Number( obj.nodes[j].top );
						 left = Number( obj.nodes[j].left );
						 bgColor = ((obj.nodes[j].status == '-1' || obj.nodes[j].status == '2')?"#bbb":"");

						 for( var n = previousObj.nodes.length - 1 ; n >= 0 ; n-- ) {
							 previousId = previousObj.nodes[n].id;
							 previousTop = Number( previousObj.nodes[n].top );
							 previousLeft = Number( previousObj.nodes[n].left );

							 //Y X
							 if( formId == previousId ) {
								 //Y线
								 htm += '<div class="line" ' +
								 		'	style="width:2px;' +
								 		'	height:'+Math.abs(top - previousTop - (left == previousLeft?130:155))+'px;' +
								 		'	top:'+(previousTop+(left == previousLeft?125:150))+'px;' +
								 		''+(bgColor != "" && obj.nodes[j].status != '2'?"background:"+bgColor+";":"")+''+
								 		'	left:'+( left + 40)+'px;">' +
								 		'&nbsp;</div><div class="triangle" ' +
								 		'style="position:absolute;top:'+(top-5)+'px;left:'+(left+36)+'px;'+((bgColor != "" &&  obj.nodes[j].status != '2')?"border-top:5px solid "+bgColor+";":"")+'"></div>';
								 htm += '<div class="line '+bgColor+'" ' +
							 		'	style="width:2px;' +
							 		'	height:'+Math.abs(top - previousTop - 155)+'px;' +
							 		'	top:'+(top+(left == previousLeft?125:125))+'px;' +
							 		''+(bgColor != ""?"background:"+bgColor+";":"")+''+
							 		'	left:'+( left + 40)+'px;">' +
							 		'&nbsp;</div>';
								 //X线
								 htm += '<div class="line" ' +
								 		'	style="width:'+(left == previousLeft?0:(Math.abs(left - previousLeft)))+'px;' +
								 		'	height:2px;' +
								 		'	top:'+(previousTop+150)+'px;' +
								 		''+(bgColor != ""?"background:"+bgColor+";":"")+''+
								 		'	left:'+(left - previousLeft < 0?left+40:previousLeft+40)+'px;">' +
								 		'&nbsp;</div>';
								  htm += '<div class="line" ' +
								 		'	style="width:'+(left == previousLeft?0:(Math.abs(left - previousLeft))+2)+'px;' +
								 		'	height:2px;' +
								 		'	top:'+(top+150)+'px;' +
								 		''+(bgColor != ""?"background:"+bgColor+";":"")+''+
								 		'	left:'+(left - previousLeft < 0?left+40:previousLeft+40)+'px;">' +
								 		'&nbsp;</div>';

							 }
				 		 }
					 }
				 }
			}

			$(htm).appendTo('#flowchart');
		},
		coordinate : function (o) {
			var obj = calculate[o.step];
				if( obj === undefined ) {
					obj = {
						step : o.step,
						type : o.nodetype,
						id : o.nodeId,
						nodes : [{
							formId : o.formId,
							status : o.status,
							id : o.subIds,
							top : o.top,
							left : o.left
						}]
					};
				} else {
					obj.nodes.push({
						formId : o.formId,
						status : o.status,
						id : o.subIds,
						top : o.top,
						left : o.left
					});
				}
				calculate[o.step] = obj;
		},
		/**
		 *通过参数计算节点坐标
		*/
		getXY : function(o) {
			var left
				, top
				, step = o.step
				, type = o.nodetype
				, fromId = o.formId
				, id = o.subIds
				, obj = calculate[step]
				, previousStep = Number(step) - 1
				, previousId = ''
				, previousTop = ''
				, previousLeft = ''
				, previousObj = ''
				, index = o.index;

			//存在上节点
			 if( previousStep >= 0 ) {
				 previousObj = calculate[previousStep];
				 for(var i = previousObj.nodes.length - 1 ; i >= 0 ; i-- ) {
					 if(previousObj.nodes[i].id == fromId) {
						 previousLeft = previousObj.nodes[i].left;
					 }
				 }
			 }

			if( type === '串发') {
				//串发
				left = ( previousLeft != '' ? previousLeft : step * 100 + 20 );
				top =  step * 180 * ( index + 1 )+10;
			} else if( type === '并发') {
				//并发
				left = index * 100 + 20;
				top =  step * 180+10;
			} else {
				//第一个节点
				if( nodeData.length > 1 ) {
					if(nodeData[1]['people-data'].length == 1) {
						left = 20;
					} else {
						left = 120;
					}
				} else {
					left = wwidth/2 - 40;
				}
				top = 10;
			}

			o['top'] = top, o['left'] = left, allWidth = (allWidth > left?allWidth:left), allHeight = top
			, endTop = top, endLeft = left;
			this.coordinate(o);
			return {
				top : top,
				left : left
			}
		},
		createDom : function(id) {
			htm = '<div id="wrapper-flowChart" class="flowchart">'+
				  '		<div id="scroller-flowChart">'+
				  '			<div id="flowchart"></div>'+
				  '		</div>'+
				  '</div>';
			$(htm).appendTo("#"+id);
		},
		iscorll : function(id) {

			var myScroll, w = ( wwidth >= allWidth+100 ? wwidth : allWidth+100 )
				, h = ( wheight > allHeight+150 ? wheight : allHeight+240 ), scale = '';
			$('#scroller-flowChart').width(w).height(h);
			$('#flowchart').width(w).height(h);
			scale = dom.getElementById("flowchart");
			if(!myScroll) {
				myScroll = new iScroll(id, {
					zoom:true,
					checkDOMChanges:true,
					zoomMin : 0.3,
					zoomMax : 3
				});
			}
			dom.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		}
	}
	LAPP.Flowchart = flowchart;
})(window);
