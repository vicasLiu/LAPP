/**
 * @File 备注组件
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
}
(function(){
    var subEvent = function( inst ) {
        var evts = new Map();
        evts.put("getParam", function(){
            inst.getParam();
        }, inst);
        evts.put("cloundVolFinish", function(string){
            inst.handleVol(string);
        }, inst);
        return evts;
    };
    var View = function( inst ) {
        /*var __createHtml = function( options ) {
            var renderTarget = options.renderTarget,
                title = options.title,
                styleSettings = options.styleSettings,
                id = options.id,
                ele = options.ele,
                height = options.height+"px",
                dialogContainer = '<div class="maskContainer"></div><div id="'+id+'" class="dialogContainer">'
                    +'<h2 class="titleDialog"><span class="closeMouse"><a href="javascript:void(0);">X</a></span>'+title+'</h2>'
                    +'<textarea class="mainArea" placeholder="'+ele+'" style="height: '+height+';">'
                    +'</textarea>'
                    +'<div>'
                    +'	<div>'
                    +'   	<div class="voice_input_cls icon-recording">语音录入</div>'
                    +'   </div>'
                    +'</div>'
                    +'</div>';
            return dialogContainer;
        };*/
        this.init = function( op ) {
            /*var html = __createHtml(inst.options);
            inst.render(html);*/
            seajs.use("core/widget/component/note/note.js",function(){
                var html = LAPP.Component.Note({op:op,componentData:data,callback:function(html){
                    inst.render(html);
                }});
            });
        };
    };
    var Note = Klass.define(LAPP.BasicPlug, {
        constructor : function( pointer ) {
            var self = this;
            self.$pointer = pointer;
            self.view = new View( self );
        },
        setOptions: function( options ) {
            var self = this;
            var evts = subEvent(self);
            self.registerEvent(evts);
            var defaultOp = {
                height : 193,
                events : {
                    el : "#"+options.render,
                    id : options.id,
                    evt : {
                        "click .LAPP-input-area-voice" : "voiceInput"
                    },
                    handle : {
                        voiceInput : function() {
                            LAPP.NativeAPI.cloundVol();
                        }
                    }
                }
            };
            self.options = $.extend(true,{},defaultOp,options);
            //if (options.data != undefined) {//是否有本地数据
                this.setData(self.options);
            //}
        },
        setData : function( op ) {
           var self = this;
            self.view.init(op);
        },
        render : function(htm){
            var self = this;
            var renderTarget = self.options.render || 'body';//渲染节点
            if( renderTarget != "body" ){
                renderTarget = "#"+renderTarget;
            }
            $(renderTarget).append($(htm));
            if( LAPP.Util.isObject(self.options.css) ) {
                $(renderTarget).css(self.options.css);
            };
            var top = $("#"+self.options.id+'T').offset().top+self.options.height;
            
            $(renderTarget).find(".voice_input_cls").css({
                top : (top -15)
            });
            LAPP.Publisher.publish("businessWidgetLoaded", self);
            if($.isFunction(self.options.cb) ){
                self.options.cb();
            }
            
           // EventCollector.initEvents(this.options.events);
        },
        fn: function( ){
            var self = this;
            var op = self.options;
            if($.isFunction(op.clickFn)){
                op.clickFn();
            }
        },
        getParam : function() {
            var self = this;
            var cid = self.componentId;
            var paramObj = {};
            paramObj[cid] = $(".mainArea").val();
            LAPP.Publisher.publish("setParam", {id : cid, data : paramObj}, self);
        },
        handleVol : function( string ) {
            $(".LAPP-input-voice-container").find("textarea").val(string);
        }
    });
    LAPP.Note = Note;
}());