/**
 * @File 折叠面板组件
 * @Import
 * @CreatedBy LAPP Mobile Components Development Group
 * @Module LAPP
 * @Date 2014-01-20
 */
"use strict";
if(!LAPP){
	var LAPP = {};
}
(function (){
    var subEvent = function( inst ) {
        var evts = new Map(), control = inst.control;;
        evts.put("dataFinish", function( data ){
            control.reviceData( data );
        }, inst);
        evts.put("confirmChooseData", function(){
            control.chooseData();
        }, inst);
        return evts;
    };
    var getChooseData = function( inst ) {  // 获取选中数据的方法
        var op = inst.options, render = op.render,
            dom = $("#"+render).find(".icon-list-radio-active").parent().parent(),  // 当前选中的class
            obj = {};
        for( var i = 0; i < dom.length; i++ ) {
            var _dom = $(dom[i]).find(".hidden"); // 隐藏域的class
            for( var j = 0; j < _dom.length; j++ ) {
                var key = $(_dom[j]).attr("data-key");
                obj[key] = $(_dom[j]).attr("data-value");
            }
        }
        return obj;
    };
    var View = function( inst ) {
        this.init = function( data ) {
            seajs.use("core/widget/component/organpanel/organpanel.js",function(){
                LAPP.Component.Organpanel({op:inst.options,componentData:data,callback:function(html){
                    inst.render(html);
                }});
            });
        };
    };
    var Control = function( inst ) {
        var dataAdapter = function(data){
            var op = inst.options,
                ele = op.ele||{},
                titleFiled = ele["title"]||"",
                formMain = ele["formMain"]||[],
                dataArr = [];
            for(var j=0; j<data.length;j++){
                var dataItem = data[j];
                var toggleLi = [];
                var packDataItem = {title:{key:dataItem[titleFiled]||"",value:titleFiled},show:true};
                for(var i=0;i<formMain.length;i++){
                    var formMainItem = formMain[i];
                    //packDataItem["show"] = formMainItem["type"]!="hidden"? true : false;
                    toggleLi.push({
                        label:formMainItem["label"],
                        textRight:dataItem[formMainItem["field"]]||"",
                        type:formMainItem["type"],
                        labelIcon : formMainItem["labelIcon"]
                    })
                }
                packDataItem["toggleLi"] = toggleLi;
                dataArr.push(packDataItem);
            }

            console.log(dataArr)
            return dataArr;

        };
        this.reviceData = function( data ) {
            var op = inst.options;
            if( $.isFunction( op.adpter ) ) {
                data = op.adpter(data);
            }else if( op.dbData != undefined ) {
                data = data[op.dbData];
            }
            this.data = data;
            //data = dataAdapter(data);
            inst.model.init(data);
        };
        this.getData = function() {
            var obj = inst.model.get();
            LAPP.Publisher.publish("publishCParam", obj, inst);
        };
    };
    var Model = function( inst ) {
        var ModelData = {};
        this.init = function( data ) {
            ModelData.initData = data;
            inst.view.init( data );
        };
        this.get = function() {
            return getChooseData();
        };
    };
    var OrganPanel = Klass.define(LAPP.BasicPlug, {
        constructor : function( pointer ) {
            this.$pointer = pointer;
            this.view = new View( this );
            this.control = new Control( this );
            this.model = new Model( this );
        },
        setOptions : function( options ) {
            var self = this;
            var evts = subEvent(self);
            self.registerEvent(evts);
            var defaultOp = {
                events : {
                    id : self.componentId,
                    el : "#"+options.render,
                    evt : {
                        "click .icon-list-roundup" : "collapseDotClick",
                        "click .icon-list-radio" : "selectClick"
                    },
                    handle : {
                        "collapseDotClick:before" : function( p ) {
                            var $this = p.current;
                            $this.toggleClass('icon-list-rounddw');
                            $this.parent().siblings('.mainPanel').toggleClass('hideDiv');
                            $this.parent('h2').toggleClass('click');
                        },
                        "collapseDotClick" : function() {
                            return false;
                        },
                        "selectClick:before" : function( p ) {
                            var $this = p.current;
                            $(".togglePanel li h2").removeClass('bgclick');
                            $('.toggleTitle .icon-list-radio').removeClass('icon-list-radio-active');
                            $this.addClass('icon-list-radio-active');
                            $this.parent('h2').addClass('bgclick');
                        },
                        "selectClick" : function() {
                            return false;
                        }
                    }
                }
            };
            self.options = $.extend(true, {}, defaultOp, options);
            if( this.options.data != undefined ){
                self.setData(this.options.formData||[]);
            }
            LAPP.Publisher.publish("businessWidgetLoaded", self);
        },
        setData : function( data ) {
            this.data = data;
            this.control.reviceData(data);
        },
        render : function( htm ) {
            var self = this
                , op = self.options
                , renderTarget = op.render;

            $('#'+renderTarget).html(htm);
            if( $.isFunction(op.cb) ) {
                op.cb();
            }
            LAPP.Publisher.publish("componentLoadedFinished", self);
            EventCollector.initEvents(op.events);
        }
    });
    LAPP.OrganPanel = OrganPanel;
}());
