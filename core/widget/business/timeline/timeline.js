/**
 * @File 工具栏组件
 * @Import
 * @CreatedBy LAPP Mobile Components Development Group
 * @GroupMember LiuSiWei ZhangHang
 * @Email suchiva@126.com
 * @Module LAPP
 * @Date 2014-01-20
 */
"use strict";
if(!LAPP){
	var LAPP = {};
};
(function(){
    var subEvent = function( inst ) {
        var evts = new Map();
        evts.put("dataFinish", function(data){
            inst.setData(data);
        },inst);
        evts.put("addMoreData", function(){
            inst.addMoreData();
        },inst);
        evts.put("loadHistoryData", function( data ){
            inst.control.loadHistoryData( data );
        },inst);
        return evts;
    };
    var View = function( inst ) {
        /*var __createTpl = function(ele) {
            var dlList = '',ddSpan = '';
            $.each(ele,function(key,value){
                var dL = '<dl class="LAPP-timeline-dl">';
                var tempCicle = '';
                for(var i = 0,len = value['timeline'].length; i < len; i++){
                    tempCicle += '<b class="LAPP-timeline-circle">&nbsp;</b>'
                }
                dL +=  tempCicle;
                dL += '<dt class="LAPP-timeline-totalList"><p>'+value['timeline'].length+'个记录</p></dt><dd class="LAPP-timeline-date">'+value['date']+'</dd><dd class="LAPP-timeline-list-dd">';

                $.each(value['timeline'],function(j,v){
                    var ddP = '<p><b class="LAPP-timeline-anchor"> &nbsp;</b>';
                    for(var k in v){
                        ddSpan = '<span>'+v[k]+'</span>';
                        ddP += ddSpan;
                    }

                    ddP +='</p>';
                    dL+=ddP;
                });
                dL +='</dd></dl>';
                dlList +=dL;
            });
            return dlList;
        };
        var __createHtml = function() {
            var op = inst.options;
            var htm = '<div class="LAPP-timeline" id="'+ op.id +'"><div class="LAPP-timeline-shafttime">&nbsp;</div>';
            return htm;
        };
        this.init = function( data ) {
            if( data.length == 0 ) {
                var htm = '';
            }else{
                var op = inst.options
                    , htm = __createHtml()
                    , html = __createTpl( data )
                    ;
                htm += html + "</div>";
            }
            inst.render(htm);
        };
        this.add = function( data ) {
            var op  = inst.options
                , render = op.render
                , htm = __createTpl(data)
                , html = $("#" + render).html()
                ;
            html += htm;
            inst.render(html);
        };*/
        //初始方法
        this.init = function( data ) {
            seajs.use("core/widget/component/timeline/timeline.js",function(){
                LAPP.Component.Timeline({op:inst.options,componentData:data,callback:function(html){inst.render(html);}});
            })
        };
        //添加
        this.add = function( data ) {
             seajs.use("core/widget/component/timeline/timeline.js",function(){
                var op = inst.options;
                if(data.length>0){
                    //html = $("#" + render).html();
                    var timeline = LAPP.Component.Timeline({op:op,componentData:data,callback:function(html){
                         var  article = $("#" + op.id).html();
                            inst.render(html);
                           $("#" + op.id).prepend(article);

                    }});
                    // html += timeline;
                    // inst.render(html);
                }
            })
            
        };
    };
    var Control = function( inst ) {
        var fliterData = function( self, data ) {
            var op = self.options, dbData = op["dbData"], tData = data;
            if( $.isFunction(op.adpter) ) {
                tData = op.adpter(data);
            }else if(!$.isArray(data)) {
                tData = data[dbData];
            }
            return tData;
        }
        this.reviceData = function( data ) {
            var tData = fliterData( inst, data );
            if( $.isArray(tData) ){
                if( (inst.options.page) && (tData.length < inst.options.page['count']) ) {
                    inst.listIsEndData = true;
                }
            }
            inst.mode.init(tData);
        };
        this.loadHistoryData = function( data ) {
            var tData = fliterData( inst, data );
            if( $.isArray(tData) ){
                if( (inst.options.page) && (tData.length < inst.options.page['count']) ) {
                    inst.listIsEndData = true;
                }
            }
            inst.mode.add(tData);
            inst.loadHistoryData(tData);
        };
    };
    var Mode = function( inst ) {
        this.init = function( data ) {
            inst.view.init( data );
        };
        this.add = function( data ) {
            inst.view.add(data);
        };
    };
	var Timeline = Klass.define(LAPP.BasicPlug, {
        constructor : function( pointer ) {
            this.$pointer = pointer;
            this.view = new View(this);
            this.control = new Control(this);
            this.mode = new Mode(this);
            this.listIsEndData = false;
        },
        setOptions : function( options ) {
            var evts = subEvent(this);
            this.registerEvent(evts);
            var defaultOp = {
                page: {
                    index: 1,
                    count: 1
                },
                events : {
                    el : "#"+options.render
                }
            };
            this.options = $.extend(true, {}, defaultOp, options);
            if( options.data != undefined ) {
                this.setData(options.data);
            }
            LAPP.Publisher.publish("businessWidgetLoaded", this);
        },
        setData : function( data ) {
            this.data = data;
            this.control.reviceData( data );
        },
        render : function( htm ) {
            var op = this.options;
            var renderTarget = op.render;//渲染节点
            $("#"+renderTarget).html(htm);
            LAPP.Publisher.publish("componentLoadedFinished", this);
            
        },
        addMoreData : function() {
            var self = this;
            if( self.listIsEndData ) {
                LAPP.Publisher.publish("receiveDataStatus", "dataEmpty", this);
                return;
            }
            LAPP.Publisher.publish("getHistoryData", this);
        },
        loadHistoryData: function (data) {//下拉加载数据
            var op = this.options;
            if (data.length == 0||data.length < op.page.count) {
                LAPP.Publisher.publish("receiveDataStatus", "dataEmpty", this);
            } else {
                
                LAPP.Publisher.publish("receiveDataStatus", "dataSuccess", this);
                 
            }
            if ($.isFunction(op.cb)) {
                op.cb(data);
            }
        }
    });
	LAPP.Timeline = Timeline;
}());