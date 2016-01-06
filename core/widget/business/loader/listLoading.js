/**
 * @File downRefresh组件
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
        evts.put("componentLoadedFinished", function(){
            inst.iscrollRender();
        }, inst);
        // evts.put("onScrollMove", function( arg ){
        //     inst.onScrollMove( arg );
        // }, inst);
        // evts.put("onScrollStart", function( arg ){
        //     inst.onScrollStart();
        // }, inst);
        // evts.put("onScrollEnd", function(){
        //     inst.onScrollEnd();
        // }, inst);
        // evts.put("onScrollCollapse", function(){
        //     inst.onScrollCollapse();
        // }, inst);
        evts.put("onTouchEnd", function(){
            inst.onTouchEnd();
        }, inst);
        // evts.put("onBeforeScrollEnd", function(){
        //     inst.onBeforeScrollEnd();
        // }, inst);
        evts.put("receiveDataStatus", function(status){
            inst.receiveDataStatus( status );
        }, inst);
        evts.put("needLoading", function(arg){
            inst.showDom(arg);
        }, inst);
        evts.put("noNeedLoading", function(arg){
            inst.hideDom(arg);
        }, inst);
        return evts;
    };
    var View = function( inst ) {
        var __createHtml = function( op ) {
            var text = "刷新时间："+LAPP.Util.getCurrentTime('hh:mm')
            var htm = '<div class="list-scroll">'+
                '     <div id="'+op.id+'-pullDown" class="_default">'+
                '         <div class="pullDownIcon"></div>'+
                '             <span class="pullDownDate">'+text+'</span>'+
                '             <span class="pullDownLabel">下拉可刷新</span>' +
                '     </div>'+
                '     <div id="' + op.containerId+ '"></div>' +
                '     <div class="addMoreItem" status="">' +
                '         <a href="javascript: void(0);" class="ui-more-load">点击加载更多</a>' +
                '     </div>'+
                '</div>';
            return htm;
        };
        this.init = function() {
            var htm = __createHtml(inst.options);
            inst.render(htm);
        };
    };
    var tempScrollY, _startTime; 
    var ListLoading = Klass.define(LAPP.BasicPlug, {
        constructor : function( pointer ) {
            this.$pointer = pointer;
            this.view = new View(this);
        },
        init : function(options) {
            this.myScroll = null;
            this.pullDownEl = null;
            this.that = null;
            this.isOptionReady = false;
            this.isDataReady = false;
            var evts = subEvent(this);
            this.registerEvent(evts);
            this.setOptions(options);
            this.refreshObj = "pull";
        },
        setOptions : function(options) {
            var self = this;
            var render = options.render;
            var defaultOp = {
                events : {
                    id : options.id,
                    el : "#"+options.render,
                    evt : {
                        "click .addMoreItem" : "addMoreItemClick"
                    },
                    handle : {
                        addMoreItemClick : function( p ) {
                            if( p.current.text().trim() == "暂无更多数据" ) {
                                return;
                            }
                            self.refreshObj = "more";
                            $("#"+options.render).find('.ui-more-load').addClass('more-load-icon').text('加载中...');
                            LAPP.Publisher.publish("addMoreData", self);
                        }
                    }
                },
                checkDOMChanges:true, 
                hScrollbar:false, 
                vScrollbar:true,
                vScroll: true,
                topOffset : 56,
                x: 0,
                y: 0, //初次加载默认位置
                useTransition : true,
                onScrollMove: function () {
                    self.onScrollMove(self.myScroll);
                    //LAPP.Publisher.publish("onScrollMove", self.myScroll, self); 
                    tempScrollY = self.myScroll.y;
                },
                onScrollStart:function (e) {
                    self.onScrollStart();
                    //LAPP.Publisher.publish("onScrollStart", self); 
                    var target = e.target;
                    var targetType = $(target).attr("el-type");
                    var type = LAPP.Util.getDevice();
                    while (target.nodeType != 1) {
                        target = target.parentNode;
                    }
                    if (target.tagName == "INPUT"||target.tagName == "TEXTAREA") {
                        if( targetType == "date" ) {
                            var tagID = $(target).attr("id");
//                          LAPP.NativeAPI.setLAPPTime("yyyy-mm-dd","",tagID, "", "");
                        }else{
                            $(target).focus();
                        }
                        if(type == "ANDROID"){
                            var h = Number(document.documentElement.clientHeight);
                            var bottom = h - LAPP.Util.findPosition(target)[3];
                            LAPPfunc.setWindowsHeight(bottom);
                        }
                    };
                    if(type == "ANDROID"){
                        if (target.tagName != "SELECT" && target.tagName != "INPUT" && target.tagName != "TEXTAREA") {
                            e.preventDefault();
                        }
                    }
                    e.preventDefault();
                },
                onBeforeScrollEnd: function() {
                    self.onBeforeScrollEnd();
                   // LAPP.Publisher.publish("onBeforeScrollEnd", self);  
                },
                onScrollEnd: function (myScroll) {
//                  console.info(1);
                    if (tempScrollY > 10) {
                        self.onScrollEnd();
                        //LAPP.Publisher.publish("onScrollEnd", self);  
                        LAPP.Publisher.publish("pullDown", self);
                    } else {
                        self.onScrollCollapse();
                       // LAPP.Publisher.publish("onScrollCollapse", self);  
                    }
                    tempScrollY = 0;
                    self.startScrollTime();
                }
            };
            this.options = $.extend(true, {}, defaultOp, options);
            this.view.init();
        },
        iscrollRender : function(){
            var self = this;
            seajs.use("core/widget/component/iscroll/iscroll.js",function(){
                var op = self.options, renderTarget = op.render;
                if(self.myScroll){
                    self.myScroll.refresh();
                }else{
                    self.myScroll = new iScroll(renderTarget, op);
                    //$('#'+renderTarget).css({"transform": "translate3d(0px, -56px, 0px) scale(1)"});
                    //$('#'+renderTarget+' ul').css({"transform": "translate3d(0px, 0px, 0px) scale(1)"});
                }
                LAPP.Publisher.publish("iSrollLoadedFinished", self.myScroll, self);
                LAPP.Publisher.publish("businessWidgetLoaded", self);
            });         
        },
        render : function( htm ) {
            var op = this.options;
            var renderTarget = op.render;//渲染节点
            $('#' + renderTarget).html(htm);
            this.pullDownEl = document.getElementById(op.id + '-pullDown');
            $('#'+op.id+'-pullDown').css({visibility : 'visible'});
            EventCollector.initEvents(op.events);
            LAPP.Publisher.publish("businessWidgetLoaded", this);
            //this.pluginEvents(op.events);
        },
        hideDom: function () {
            var options = this.options;
            // children("div.addMoreItem")  新增 class addMoreItem， 数据不够只隐藏加载更多
            $('#' + this.options.render).children('div').children("div.addMoreItem").hide();
//            $('#' + this.options.containerId).attr("style","display:block");
            this.noNeedLoading = true;
            
            // 没有下拉加载更多时最后一行 li 下面增加一条线
            $('#' + this.options.render +' ul.LAPP-list').addClass('LAPP-list-last-border');

        },
        showDom: function () {
            $('#' + this.options.render).children('div').children("div").show();
            // $('#' + this.options.render).show();
        },
        onRefresh : function() {
            var that = this.that, pullDownEl = this.pullDownEl;
            if( that == undefined ) {
                LAPP.Util.scrollTo(-56);
            }
            if( that && pullDownEl.className.match('loading')) {
               that.scrollTo(0, -56, 500, 0);
               // LAPP.Util.scrollTo(-56);
                setTimeout(function() {
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉可刷新';
                    pullDownEl.querySelector('.pullDownDate').innerHTML = "上次更新时间："+LAPP.Util.getCurrentTime('hh:mm');
                    pullDownEl.className = '_default';
                },500);
            }
        },
        onScrollMove : function( myScroll ) {
            var pullDownEl = this.pullDownEl;
            if (myScroll.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip _default';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '松开可刷新';
                myScroll.minScrollY = 0;
            } else if (myScroll.y < 5 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '_default';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '继续下拉可刷新';
                myScroll.minScrollY = -56;
            }
            
//          //解决列表数据不够时可上拉 上面的数据会被挡住
            var __$pullDown = $('#' + this.options.render +' .list-scroll div:first-child');
            if(__$pullDown.css('display') == 'none' && myScroll.maxScrollY < 0) myScroll.maxScrollY = 0;
            this.that = myScroll;

            /*
            //上拉
            var pullDownEl = this.pullDownEl;
            if ( myScroll.y <= 10 && myScroll.y > 0 && !pullDownEl.className.match('flip') ) {
                    pullDownEl.className = '_default';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '继续下拉可刷新';
                } else if(myScroll.y > 10) {//下拉
                    if( $(pullDownEl).hasClass("flip") ) {
                        return;
                    }
                    pullDownEl.className = 'flip';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '松开可刷新';
                } else {

                }
                
                /*
                if(this.noNeedLoading && myScroll.maxScrollY < 0) myScroll.maxScrollY = 0;
                this.that = myScroll;
                */
            /*
                //解决列表数据不够时可上拉 上面的数据会被挡住
                var __$pullDown = $('#' + this.options.render +' .list-scroll div:first-child');
                if(__$pullDown.css('display') == 'none' && myScroll.maxScrollY < 0) myScroll.maxScrollY = 0;
                this.that = myScroll;
            */
        },
        onScrollStart : function() {

        },

        onBeforeScrollEnd : function() {
        },
        onScrollEnd : function() {

            this.refreshObj = "pull";
            var that = this.that, pullDownEl = this.pullDownEl;
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '努力加载中...';
            }
            if( that && that.y > -56) {
                if (that.y < 10 && !pullDownEl.className.match('flip')) {
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '正在刷新';
                        this.refreshObj = "pull";
                }

            }

        },
        onScrollCollapse : function() {
            var that = this.that, pullDownEl = this.pullDownEl;
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '努力加载中...';
            }
            if( that && that.y > -56) {
                if (that.y > 0 && that.y < 10 && !pullDownEl.className.match('flip')) {
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉可刷新';
                    LAPP.Util.scrollTo(-56);
                     this.refreshObj = "pull";
                }
            }
        },
        onTouchEnd : function() {
            var that = this.that, pullDownEl = this.pullDownEl;
            if( that && (that.y < 10) && that.y >= -55 && !pullDownEl.className.match('flip')) {
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉可刷新';
            }
        },
        changeStatus : function( status ) {
            var self = this;
            var op = self.options;
            var obj = self.refreshObj;
            var moreDom = $("#"+op.render).find('.ui-more-load'),downDom = $("#"+op.render).find(".pullDownLabel");
            if( obj == "pull" ) {
                if(status === 'success') {
                    downDom.text("获取数据成功");
                    $(".addMoreItem").show();
//                    setTimeout(function(){
                        var render_hei = $("#"+op.render).height(),
                            containDiv_hei = $("#"+op.containerId).height();
                        // 如果可视高度大于所显示条数总高度 listloading则不显示
                      //修改下拉逻辑，可视高度大于显示条数高度， listloading 也显示。
//                        if(containDiv_hei>render_hei){
                            self.onRefresh();
//                        }
                        moreDom.removeClass('more-load-icon').text('点击加载更多');
//                    },1000);
                }
                if (status === 'error') { //报错
                    downDom.text("获取数据失败");
                    setTimeout(function(){
                        self.onRefresh();
                    },1000);
                }
                if (status === 'timeout') { //超时
                    downDom.text("获取数据超时");
                    setTimeout(function(){
                        self.onRefresh();
                    },1000);
                }
                if(status === 'dataEmpty'){
                    $(".addMoreItem").hide();
                }
            }else{
                if(status === 'dataEmpty') {
                    moreDom.removeClass('more-load-icon').text('暂无更多数据');
                }
                if (status === 'error') { //报错
                    moreDom.removeClass('more-load-icon').text('获取数据失败');
                }
                if (status === 'timeout') { //超时
                    moreDom.removeClass('more-load-icon').text('获取数据超时');
                }
                if(status === 'dataSuccess') {
                    moreDom.removeClass('more-load-icon').text('点击加载更多');

                }
                if(self.that) self.that.refresh();
            }

        },
        receiveDataStatus : function( status ) {
            this.changeStatus(status);
        },
        startScrollTime: function () {
            _startTime =  new Date().getTime();
        },
        getScrollTime: function () {
            return _startTime;
        },
    });
    LAPP.ListLoading = ListLoading;
}());
