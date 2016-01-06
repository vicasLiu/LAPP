/**
 * @File 风琴模板组件
 * @Import
 * @CreatedBy LAPP Mobile Components Development Group
 * @GroupMember LiuSiWei ZhangHang
 * @Email suchiva@126.com
 * @Module LAPP
 * @Date 2014-01-20
 */
"use strict";
if(!LAPP) {
    var LAPP = {};
}
(function() {
    var subEvent = function( inst ) {
        var evts = new Map(), control = inst.control;
        evts.put("dataFinish", function( data ){
            control.receiveData( data );
        }, inst);
        return evts;
    };
    
    var View = function( inst ) {
        /*var __defaultFn = function(data) {
            if(data == null || data == 'null' || data == undefined || data == 'undefined'){
                return "";
            }
            return data;
        };

        var __createHtml = function(options) {
            var renderTarget = options.render,
                id = options.id,
                ele = options.ele,
                mapHtml = '<ul class="LAPP_vocation_list" id="'+ id +'">',
                op = '',
                isSelected = options.isSelected ? '': 'none',
                isCollapse = options.isCollapse ? '': 'none';
            op += '{@each toggleData as item, index}'+
            var isHide = item['isHide']? 'none':'';
            op += '<li class="'+ item['cls'] +'" value="'+ item['value'] +'"><a href="###" style="display:'+isHide+'"><span class="word_span">' + item['text'] + '</span><span class="left_part" style="display:'+isSelected+'"></span><div class="right_div" style="display:'+isCollapse+'"></div></a><div class="out_li_box"><div class="hidebox layout" id="'+ item['boxid'] +'"></div></div></li>';
            op += '{@/each}';
            mapHtml += op;
            mapHtml += '</ul>';
            return mapHtml;
        };*/
        this.init = function( data ) {
            /*var tpl = __createHtml( inst )
                , toggle = { toggleData : data }
                , html
                ;
            html = juicer( tpl, toggle );
            inst.render(html);*/
            seajs.use("core/widget/component/vocationlist/vocationlist.js",function(){
                var html = LAPP.Component.vocationlist({op:inst.options,componentData:data,callback:function(){inst.render(html);});
            }
        };

    };
    var Control = function( inst ) {
        this.reviceData = function( data ) {
            var op = inst.options;
            if( $.isFunction( op.adpter ) ) {
                data = op.adpter(data);
            }else if( op.dbData != undefined ) {
                data = data[op.dbData];
            }
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
    };

    var  VocationList = Klass.define(LAPP.BasicPlug, {
        constructor : function( pointer ) {
            this.$pointer = pointer;
            this.view = new View( this );
            this.control = new Control( this );
            this.model = new Model( this );
        },
        setOptions : function(options) {
            var self = this;
            var evts = subEvent(self);
            self.registerEvent(evts);
            var defaultOp = {
                id : 'x-2008',
                ele :  [],
                render : 'body',
                events : {
                    id : "123",
                    el : "#"+options.render,
                    evt : {
                        'click .right_div' : 'setDown',
                        'click .left_part' : 'clickRadio'
                    },
                    handle : {
                        'setDown:before': function(p) {
                            var _this = $(p.current).parent().parent();
                            if(!_this.hasClass('active')){
                                _this.addClass('active');
                            }else{
                                _this.removeClass('active');
                            }
                            p.ev.stopPropagation();
                        },
                        'setDown' : function() {

                        },
                        'clickRadio:before' : function(p) {
                            var _this = $(p.current);
                            if(!_this.hasClass('checked')){
                                _this.addClass('checked');
                                _this.parent().parent().attr('checked', true);
                            }else{
                                _this.removeClass('checked');
                                _this.parent().parent().attr('checked', false);
                            }

                        },
                        'clickRadio' : function() {

                        }
                    }
                }
            }
            this.options = $.extend(true, {}, defaultOp, options);
            if( this.options.data != undefined ){
                self.setData(this.options.data);
            }
            LAPP.Publisher.publish("businessWidgetLoaded", self);
        },
        setData : function( data ) {
            this.data = data;
            this.control.reviceData(data);
        },
        render: function(htm) {
           var self = this
                , op = self.options
                , renderTarget = op.render;

            $('#'+renderTarget).html(htm);
            if( $.isFunction(op.cb) ) {
                op.cb();
            }
            LAPP.Publisher.publish("componentLoadedFinished", self);
            //EventCollector.initEvents(op.events);
        }
    })
    LAPP.VocationList = VocationList;
}());