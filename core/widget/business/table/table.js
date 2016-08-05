/**
 * @File 表格组件
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
        var evts = new Map(), control = inst.control;
        evts.put("publishParam", function( arg ){
            control.receiveParam( inst, arg );
        }, inst);
        evts.put("dataFinish", function( data ){
            control.receiveData( data );
            //inst.setData(data);
        }, inst);
        evts.put("pComponentParam", function(arg){
            control.receiveCParam(inst, arg);
        }, inst);
        return evts;
    };
    var View = function( inst ) {
        this.init = function( data ) {
           seajs.use("core/widget/component/table/table.js",function(){
                var table = LAPP.Component.Table({op:inst.options,componentData:data,callback:function(html){inst.render(html);}});
            });
        };
    };
    var Control = function( inst ) {
        this.receiveParam = function( data ) {

        };
        this.receiveData = function(data){
            var op = inst.options;
            if ($.isFunction(op.adpter)) {
                data = op.adpter(data);
            } else if (op.dbData != undefined && !$.isArray(data)) {
                data = data[op.dbData];
            }
            inst.model.init(data);
        };
        this.receiveCParam = function(){
             if( arg['componentEventType'] == "chartLoadFinish") {
                var data = inst.data ;
                this.control.receiveData(data);
            }
        };
    };
    var Model = function( inst ) {
        var ModelData = {};
        this.init = function (data) {
            ModelData.initData = data;
            inst.view.init(data);
        };
    };
    var Table = Klass.define(LAPP.BasicPlug, {
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
            if( options.formData ) {
                self.setData(options.formData);
            }
            LAPP.Publisher.publish("businessWidgetLoaded", self);
        },
        setData : function( data ) {
            this.data = data;
            this.control.receiveData(data);
        },
        render : function (html) {
            var options = this.options;
            var renderTarget = options.render || 'wrapper',//渲染节点
                id= options.id;
            // var retData = this.data;
            // if( $('#'+renderTarget).length == 0 ) {
            //     return;
            // }
            // if( retData == undefined ) {
            //     return;
            // }
            // if( $.isFunction(options.adpter) ) {
            //     retData = options.adpter(retData);
            // }
            //var htm = createHtml(options,retData);
            $('#'+renderTarget).append($(html));
            if( $.isFunction(options.cb) ) {
                options.cb();
            }
            this.loadScroll(id);
            LAPP.Publisher.publish("componentLoadedFinished", this);
        },
        fn: function(){
            var self = this;
            var op = self.options;
            if($.isFunction(op.clickFn)){
                op.clickFn();
            }
        },
        loadScroll: function(renderTarget){
            var render = renderTarget;
            new iScroll(render,{checkDOMChanges:true, hScrollbar:false, vScrollbar:false, vScroll: false,hScroll: true});
        }
    });
    LAPP.Table = Table;
}());
