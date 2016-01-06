/**
 * Created by Gaotd on 2015/1/14.
 */
"use strict";
if (!LAPP) {
	var LAPP = {};
};
(function(){
	var widgetHub = function () {};
	widgetHub.fac = function (type,args) {
		var __type = type, __widget;
		if (typeof __fac[__type] !== 'function') {
				console.error( '--'+ __type + '--doesnot exists!');
		}
		__widget = __fac[__type](args);
		return __widget;
	};
	var _input_html = function(args,_type){
		var _html = '',obj,
			args = {
			    type: _type,
				height : args.height,
				isVoice : args.isVoice,
				placeholder: args.placeholder,
				text : args.value,
				id: args.id,
				cls: args.cls
			};
		_html += LAPP.Widget.Input(args).html();
		obj = {
			html : _html,
			Event : function(){
				//
			}
		}
		return obj;
	};
	var __fac = {
		// 不知道有何用
		listKnow : function() {
			var arr = [];
			for (var i in widgetHub) {
				if (widgetHub.hasOwnProperty(i)) {
					if (i !== 'fac' && i !== 'listKnow') {
						arr.push(i);
					}
				}
			}
			return arr;
		},
		// button
		btn : function(args) {
			var _html = '',obj,
				args = {
				    type: args.InputType,  // text textIconUp(上) textIconRight(右) textIconBottom(下) textIconUpLeft(左)
				    id: args.id+'btnx', // 防止冲突,
				    height : args.height,
				    width : args.width,
				    background : args.background,
				    color : args.color,
				    fontSize : args.fontSize,
				    border : args.border,
				    text: args.value,
				    iconSize : args.iconSize,
				    iconColor : args.iconColor,
				    icon : args.icon   // 字体图标
				};
			_html += LAPP.Widget.Button(args);
			obj = {
				html : _html,
				Event : function(){
					//
				}
			}
			return obj;
		},
		// textarea
		textarea : function (args) {
			var obj = _input_html(args,'voiceHas');
			return obj;
		},
		// div
		div : function(args) {
			var id = args.id+'div', // 防止冲突
			cls = args.cls,_value = args.value,
			_html = '<div id="'+ id +'" class="'+ cls+'">' + _value + '</div>',
			obj = {
				html : _html,
				Event : function(){
					//
				}
			}
			return obj;
		},
		// switch
		switchBtn : function (args) {
			var _html = '',obj,
				args = {
			    width : args.width || '',
			    height : args.height || '',
			    id : args.id+'Btn',
			    text : args.arr || '',
			    background : args.background || '', // 背景颜色(false)
			    activeBackground : args.activeBackground || '',  // 背景颜色(true)
			    color : args.color || '', // 字体颜色
			    fontSize : args.fontSize || '',   // 字体大小
			    valDefault : args.valDefault || args.value || '',  // 默认是否选中
			    cls : args.cls || '',
			    orderId : args.orderId || '',
			    groupId : args.groupId || '',
			    key : args.field || ''
			};
			_html += LAPP.Widget.Switch(args).html();
			obj = {
				html : _html,
				Event : function(){
					LAPP.Widget.Switch(args).event();
				}
			}
			return obj;
		},
		radio : function(args){
			var _html = '',obj;
			args = {
			    id: args.id+'radio', // 防止冲突
				name: args.name || '',
				cls: args.cls || '',
				value : args.value || '',
				arr : args.arr || []
			};
			_html += LAPP.Widget.Radio(args).html();
			obj = {
				html : _html,
				Event : function(){
					LAPP.Widget.Radio(args).event();
				}
			}
			return obj; 
		},
		// hidden
		hidden : function (args) {
			var _html = '<input type="hidden"/>',
			obj = {
				html : _html,
				Event : function(){
					//
				}
			}
			return _html;
		},
		// select
		select: function (args) {
			var _html = args.value,
			obj = {
				html : _html,
				Event : function(){
					//
				}
			}
			return obj;
		},
		date: function (args) {
			var obj = _input_html(args,'dateType');
			return obj;
			// var html = '<input readOnly="true" id="'+LAPP.Util.createId()+'" class="form_spanDate form_span '+ args.evtClass+'" el-type="'+args.elType+'" orderId="'+args.orderId+'" groupId="'+args.groupId+'" data-key="'+ args.dataKey+'" verify="'+args.verify+'" subType="'+args.subType+'" value="'+args.tempValue+'"/>';
			// return html;
		},
		// number
		number: function (args) {
			var obj = _input_html(args,'numberType');
			return obj;
		},
		// inputText textType
		inputText: function (args) {
			var obj = _input_html(args,'textType');
			return obj;
		},
		// password
		password: function (args) {
			var obj = _input_html(args,'passwordType');
			return obj;
		},
		// slider
		dragBar: function (args) {
			var _html = '',obj,
				args = {
				    id: args.id+'drag', // 防止冲突,
				    defaultsValue : -(0-args.value) || -(0-args.arr[0]),   // 默认值
				    text: args.arr,    
				    step: args.step,   // 每个步距量
				    width: '100%',
				    disable : args.disable,   // 是否可以拖动 默认为false  false表示可以拖动
				    showScale : args.showScale, // 是否显示底部label值 默认为true
				    showLabels: args.showLabels // 是否显示头部label值 默认为true
				};
			_html += LAPP.Widget.Slider(args).html();
			obj = {
				html : _html,
				Event : function(){
					LAPP.Widget.Slider(args).event();
				}
			}
			return obj;
		},
		tapBtn: function (args) {
			var html = '<input type="button" class="LAPP-tapBtn" value=""/>';
			return html;
		}

	};
	LAPP.widgetHub = widgetHub;
}());
