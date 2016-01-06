/**
 * @File 布局组件
 * @Import
 * @CreatedBy LAPP Common Components Development Group
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
    var resolveStyle = function( obj, totalHeight ) {
        var styleStr = 'display:none;position:absolute;width:100%;';
        var height = obj.height;
        if(/\d/.test(height)){
            styleStr += 'height:'+(height)+'px;';
        }else{
            styleStr += 'height:'+(totalHeight-obj.top)+'px;';
        }
        var top = obj.top;
        if( top != undefined ) {
            styleStr += 'top:'+(top)+'px;';
        }
        var bottom = obj.bottom;
        if( bottom != undefined ) {
            styleStr += 'bottom:'+(bottom)+'px;';
        }
        return styleStr;
    };
    var subEvent = function(inst) {
    };
    var Layout = function( pointer ) {
        this.$pointer = pointer;
    };
    Layout.prototype = {
        constructor : Layout,
        init : function( options ) {
            subEvent(this);
            this.setOptions(options);
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
        setOptions: function( options ) {
            var renderTarget = options.render || 'body',
                ele = options.ele||[{header:{top: 0,height:30}},{search:{top: 31,height: 30}},{wraper:{top: 61/*,height: 'auto'*/}}];

            //加载Dom
            this.createHtml(renderTarget,ele);
        },
        createHtml: function(renderTarget,ele) {
            var str='';
            var totalHeight = $(window).height();
            $.each(ele,function(key,value){
                for(var i in value){
                    var styleStr = resolveStyle(value[i]);
                    // if(/\d/.test(value[i].height)){//判断高度是否为数字
                    //    var tempDiv = '<div id="'+i+'" class="LAPP-layout '+(value[i].cls?value[i].cls:"")+'" style="display:none;top:'+value[i].top+'px;position:absolute;width:100%;height:'+value[i].height+'px;"></div>'; 
                    // }else{
                    //     var tempDiv = '<div id="'+i+'" class="LAPP-layout '+(value[i].cls?value[i].cls:"")+'" style="display:none;top:'+value[i].top+'px;position:absolute;width:100%;height:'+(totalHeight-value[i].top)+'px;"></div>';
                    // }
                    var tempDiv = '<div id="'+i+'" class="LAPP-layout '+(value[i].cls?value[i].cls:"")+'" style="'+styleStr+'"></div>';
                    str+=tempDiv;
                }
            });
            var renderTarget = $(renderTarget).length==0 ? $("#"+renderTarget) : $(renderTarget);
            renderTarget.append($(str));
            renderTarget.height(totalHeight);
        }
    };
    LAPP.Layout = Layout;
}());