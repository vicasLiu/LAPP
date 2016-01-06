"use strict";
if(!LAPP){
	var LAPP = {};
};
(function(){
	var subEvent = function( inst ) {
		var evts = new Map(), control = inst.control;
        evts.put("triggleButton", function( arg ){
            inst.handleEvent(arg);
        }, inst);
        return evts;
	};


	var View = function( inst ){
		/*var __createHtml = function( options, inst ) {
			var ele = options.ele;
			var render = options.render;
			var htm = '<div class="ui-toolbar" id="ui-toolbar">'+
					'	<div class="ui-toolbar-content">';
			for( var i = 0; i < ele.length; i++ ) {
				inst.eventCallback.put(ele[i].text, ele[i].fn);
				htm += '		<a href="javascript:void(0);" class="ui-link ui-btn evt-click">'+ele[i].text+'</a>';
			}
			htm +=  '	</div>'+
					'</div>'+
					'<div id="ui-cancel" class="ui-cancel">'+
					'	<div class="ui-toolbar-content">'+
					'		<a href="javascript:void(0);" class="ui-link ui-btn evt-click">取消</a>'+
					'	</div>'+
					'</div>'+
					'<div class="ui-screen ui-overlay-b"></div>';
			$("#"+render).html(htm);
		};*/
		this.init = function( inst ) {
            /*var tpl = __createHtml( inst.options,inst );
            inst.render(html);*/
            seajs.use("core/widget/component/pushbutton/pushbutton.js",function(){
                LAPP.Component.Pushbutton({op:inst.options,componentData:inst.options.ele,callback:function(html){inst.render(html);}});
            });
        };
	};
	/*var Control = function( inst ) {
        this.reviceData = function( data ) {
            var op = inst.options;
            if( $.isFunction( op.adpter ) ) {
                data = op.adpter(data);
            }else if( op.dbData != undefined ) {
                data = data[op.dbData];
            }
            inst.model.init(data);
        };
    };
    var Model = function( inst ) {
        var ModelData = {};
        this.init = function( data ) {
            ModelData.initData = data;
            inst.view.init( data );
        };
    };*/
 
	var PushButton = Klass.define(LAPP.BasicPlug,{
		constructor : function( pointer ) {
			var self = this;
            self.$pointer = pointer;
            self.view = new View( self );
           /* this.control = new Control( this );
            this.model = new Model( this );*/
        },
		setOptions : function( options ) {
			var defaultOptions = {
				events : {
    				id : "PushButton",
    				el : "#"+options.render
    			}
			};
			var self = this;
			self.options = $.extend(true , {}, defaultOptions, options);
			var evts = subEvent(self);
            self.registerEvent(evts);
			var defaultShow = options.defualt ? options.defualt : false;
			self.view.init(self);
			//document.getElementById("ui-toolbar").style.width = (document.body.clientWidth-16)+"px";
			//document.getElementById("ui-cancel").style.width = (document.body.clientWidth-16)+"px";
			if(defaultShow){
				$("#ui-toolbar").show();
				$('#ui-cancel').show();
				$('.ui-overlay-b').show();
			};
			self.bindEvent();
		},
        render: function(htm) {
           var self = this
                , op = self.options
                , renderTarget = op.render,
                id = "";
            if(renderTarget == "body"){
            	id=renderTarget;
            }else{
            	id= "#"+renderTarget;
            }
            $(id).append(htm);
            if( $.isFunction(op.cb) ) {
                op.cb();
            }
			LAPP.Publisher.publish("businessWidgetLoaded", self);
            LAPP.Publisher.publish("componentLoadedFinished", self);
            //EventCollector.initEvents(op.events);
        },
		handleEvent : function( type ) {
			var op = this.options;
			var render = op.render;
			if( type == "hide" ){
				$("#"+render).hide();
				$("#"+render).find("section").hide();
			}else {
				$("#"+render).show();
				$("#"+render).find("section").show();
			}
		},
		bindEvent : function() {
			var id = this.options.render;
			var cb = this.eventCallback;
			var self = this;
			LAPP.Events.bindEvent($("#"+id), ".evt-click", "click", function(p){
				var tx = p.text();
				if(tx == "取消"){
					self.handleEvent("hide");
				}else{
					var callback = cb.get(tx);
					callback(tx);
					self.handleEvent("hide");
				}
			});
			LAPP.Events.bindEvent($("#"+id), ".ui-overlay-b", "click", function( p ){
				self.handleEvent('hide');
				p.hide();
			});
		}
	});
	LAPP.PushButton = PushButton;
}());