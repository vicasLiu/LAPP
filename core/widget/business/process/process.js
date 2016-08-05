/**
 * @File 列表组件
 * @Import
 * @CreatedBy LAPP Mobile Components Development Group
 * @Module LAPP
 * @Date 2014-01-20
 */
"use strict";
if(!LAPP){
    var LAPP = {};
};
(function(){
    var subEvent = function( inst ) {
        var evts = new Map(),
            me = inst,
            control = me.control;
        evts.put("dataFinish", function( data ){
            control.receiveData( me , data );
        }, inst);
        evts.put("publishParam", function(arg){
            control.receiveParam(me, arg);
        }, inst);
        evts.put("pComponentParam", function(arg){
            control.receiveCParam(me, arg);
        }, inst);
        return evts;
    };
    var View = function( inst ) {
       /* var __createHtml = function( options, data, flg ) {
            var ul = '',
                id = options['id'];
            $.each(data,function(key,value){
                var li = '<li><span class="LAPP-process-icon">icon</span>',tempField='', statusHtm = "";
                for(var i in value){
                    statusHtm = value[i];
                    if(value[i] === false){
                        statusHtm ='<b class="LAPP-process-disagree">拒绝</b>';
                    }
                    if(value[i] === true){
                        statusHtm ='<b class="LAPP-process-agree">同意</b>';
                    }
                    if(value[i] === null){
                        statusHtm ='<b class="LAPP-process-null">待审批</b>';
                    }
                    tempField += '<span>'+statusHtm+'</span>';
                }
                li += tempField;
                li += '<span class="LAPP-process-more">more</span><span style="clear: both;width: 0;height: 0;"></span></li>';
                ul+=li;
            });
            ul ='<ul class="LAPP-process-wrap" id="'+id+'">'+ul+'</ul>';
            return ul;
        };*/
        this.init = function( data ) {
            /*var html = __createHtml( inst.options, data ,true );
            inst.render(html);*/
            var op = inst.options,
                data = data;
            seajs.use("core/widget/component/process/process.js",function(){
                LAPP.Component.Process({op:op,componentData:data,callback:function(html){inst.render(html);}});
            });
        };
    }

    var Control = function( inst ) {

        this.receiveCParam = function( inst, data ) {
            if( !LAPP.Util.isObject(data) ) {
                return;
            }
            //this.receiveData( inst, data );
        };
        this.receiveData = function( inst, data ) {
            var op = inst.options;
            if( $.isFunction( op.adpter ) ) {
                data = op.adpter(data);
            }else if( op.dbData != undefined ) {
                data = data[op.dbData];
            }

            var self = inst;

            var op = self.options;
            var dt = data;
            var dataFormat = op.dataFormat;
            var renderTarget = op.render || 'renderContainer';//渲染节点

            if( $("#"+renderTarget).length == 0 ) {
                return;
            }
            if(dataFormat != undefined && dt == undefined) {
                if( data == null || data == undefined ) {
                    dt = [];
                }else {
                    dt = dataFormat(data);
                }
            };
            if( dt == undefined || dt.length == 0 ) {
                return;
            }

            inst.model.init(dt);
        };
        this.receiveParam = function( inst, arg ) {

        };
    };

    var Model = function( inst ) {
        var ModelData = {};
        this.init = function( data ) {
            ModelData.initData = data;
            inst.view.init( data );
        };
    };


    var Process= Klass.define(LAPP.BasicPlug, {

        constructor : function( pointer ) {
            this.$pointer = pointer;
            this.view = new View( this );
            this.control = new Control( this );
            this.model = new Model( this );
        },

        setOptions: function( options ) {
            var self = this;
            var evts = subEvent(self);
            self.registerEvent(evts);
            self.options = options;
            self.options.events = {};
            if( self.options.data != undefined ){
                self.setData(this.options.data);
            }
            LAPP.Publisher.publish("businessWidgetLoaded", self);
        },
        setData : function( data ) {
            var self = this;
            self.data = data;
            self.control.receiveData(self , data);
        },
        render : function(htm) {
            var self = this;
            var op = self.options;
            var dataFormat = op.dataFormat;
            var renderTarget = op.render || 'renderContainer',//渲染节点
                id= op.id;

            if( $("#"+renderTarget).length == 0 ) {
                return;
            }
            $('#'+renderTarget).html(htm);
            var bTag = $('#'+renderTarget +' span').children('b');
            $.each(bTag,function(key,value){
                if($(value).attr('class')=='LAPP-process-disagree'){
                    $(value).parent('span').parent('li').addClass('LAPP-process-disagree');
                }
                if($(value).attr('class')=='LAPP-process-agree'){
                    $(value).parent('span').parent('li').addClass('LAPP-process-agree');
                }
                if($(value).attr('class')=='LAPP-process-null'){
                    $(value).parent('span').parent('li').addClass('LAPP-process-null');
                }
            });
            if( LAPP.Util.isObject(op.css) ) {
                $('#'+renderTarget).css(op.css);
            }
            self.fn();
            LAPP.Publisher.publish("componentLoadedFinished", self);
        },
        fn: function( ){
            var self = this;
            var op = self.options;
            //操作伸缩更多信息
            $('ul.LAPP-process-wrap li').unbind("click").click(function(){
                $(this).toggleClass('LAPP-process-collapse');
            });
            if($.isFunction(op.clickFn)){
                op.clickFn();
            }
        },
        loadScroll: function(renderTarget){
            new iScroll('wrapper',{hScrollbar:false, vScrollbar:true,vScroll: true,checkDOMChanges: true});
        },
        refresh : function() {
            this.setOptions(this.options);
        }
    });
    LAPP.Process = Process;
}());
