/**
 * Created by Gaotd 2015-1-12.
    @include toast
 */
"use strict";
if(!LAPP){
    var LAPP = {};
}
if (!LAPP.Component) {
    LAPP.Component = {};
}
(function (win, undefined) {
    var url = [
        "css/component/timepick/timepick.css",
        "css/component/toast/toast.css",
        "core/widget/component/iscroll/iscroll.js"
    ];
    var createHtml = function (args) {
        var tpl = createTpl(args)
            , html = ''
            , data = args.op.ele || args.componentData 
            , btn = {listData: data};
        html = juicer(tpl, btn);
        return html;
    };
    var createTpl = function (args) {
        var op = args.op,
            _html = '',
            id = op.id,
            _html = '<div class="LAPP-timepick" id="'+id+'"><ul class="LAPP-timepick-ul">';
        for(var i=0;i<24;i++){
            var Class_active = '';
            _html += '<li value="'+i+'" class="">'+i+':00</li>';
        }
        _html += '</ul></div>';
        return _html;
    };
    var Timepick = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
                var id = args.op.id;
                var timepick_ul = $("#"+id).find('ul');
                var timepick_ul_li = $(timepick_ul).find('li');
                var li_width = $(timepick_ul_li).width();
                var len = $(timepick_ul_li).length;
                $(timepick_ul).width(li_width*len);
                var myScroll = new iScroll(id,{
                    hScrollbar:false,  
                    hScroll: true, 
                    vScrollbar:false,  
                    vScroll: false,
                });
                var date = new Date(),
                    hour = date.getHours(),
                    tempP = hour*($(timepick_ul_li).width()),
                    maxWid = li_width*len-$(window).width(),
                    tempP1 = (tempP > maxWid) ? maxWid : tempP;

                $(timepick_ul).css({"-webkit-transform":'translate3d(-'+tempP1+'px, 0px, 0px)'});
                
                if( args.componentData != undefined ){
                    renderClass(args);
                }
                LAPP.Events.bindEvent($("#"+id+" ul"), 'li', "click",function(e){
                    timeClick($(e),args);
                });
            }
        });
        // 添加class
        var renderClass = function(args){
            var date = new Date(),i=0,id = args.op.id,
                _year = date.getFullYear(),
                _month = date.getMonth()+1,
                _date = date.getDate(),
                hour = date.getHours(),
                user_Newdate = args.componentData.date,
                user_year = user_Newdate.split('-')[0],
                user_month = user_Newdate.split('-')[1],
                user_date = user_Newdate.split('-')[2],
                timepick_ul = $('#'+id).find('ul'),
                timepick_ul_li = $(timepick_ul).find('li'),
                li_len = $(timepick_ul_li).length;
                for( var n=0;n<li_len;n++ ){
                    if( user_year>_year || ( user_year==_year&& (user_month>_month) ) || ( user_month == _month && (user_date>_date) ) ){
                        //
                    }else if( user_year<_year || ( user_year==_year&& (user_month<_month) ) || ( user_month == _month && (user_date<_date) ) ){
                        $(timepick_ul_li).eq(n).addClass('bg-gray');
                    }else if(hour>=n){
                        $(timepick_ul_li).eq(n).addClass('bg-gray');
                    }
                }
            
            for( ; i < timepick_ul_li.length; i++ ) {
                if( $.inArray(i, args.componentData.time) != -1 ) {
                    $(timepick_ul_li[i]).attr("class", "bg-red");
                }
            }
        };
        // 点击事件
        var timeClick = function(obj,args) {
            // 没有提示框才可以点击
            if(!$("#diglogTimepick").length){
                var opData = args.componentData.ele || {},_value = '';
                var __totalnum = function(obj) {
                    var green_arr = [];
                    
                    for(var num=0;num<$(obj).length;num++){
                        if($(obj).eq(num).hasClass('bg-green')){
                            var gvalue = $(obj).eq(num).val();
                            green_arr.push(gvalue);
                        }
                    }
                    console.log(green_arr);
                };
                var _parent = $(obj).parent().parent();
                var timepick_ul = $(_parent).find("ul");
                var timepick_ul_li = $(timepick_ul).find("li");
                if($(obj).hasClass('bg-gray')){
                    _value = opData.failValue || '时间已失效';
                    $("#diglogTimepick").html();
                    // alert('时间已失效！');
                }else if($(obj).hasClass('bg-red')){
                    _value = opData.checkedValue || '时间已选中';
                }else{
                    var index = $(obj).index(),
                        index1 = 0; 
                    // 查找到第一个li包含的bg-green
                    while(!$(timepick_ul_li).eq(index1).hasClass('bg-green')){
                        index1++;
                        if(index1==timepick_ul_li.length) break;
                    }
                    // 给区间添加bg-green
                    if(index>index1){
                        for(var m=index1;m<index;m++){
                            var red = $(timepick_ul_li).eq(m).hasClass('bg-red');
                            // 如果区间中已经有选中，则直接跳出循环
                            if(red){
                                // 删除区间后面bg-green类
                                for(var t=m;t<index;t++){
                                    $(timepick_ul_li).eq(t+1).removeClass('bg-green');
                                }
                                _value = opData.continuousValue || '选择的区间有已经选中！';
                                __totalnum(timepick_ul_li);
                                if(_value){
                                    // 弹出框
                                    $("body").append('<section id="diglogTimepick" class="LAPP-component-dialog-failure" style="top:50px;">'+_value+'</section>');
                                    setTimeout(function(){
                                        $("#diglogTimepick").animate({"opacity":0},500);
                                        setTimeout(function(){
                                            $("#diglogTimepick").remove();
                                        },501);
                                    },2000);
                                }
                                return false;
                            }else{ 
                                $(timepick_ul_li).eq(m).addClass('bg-green'); 
                            }
                        }
                    }
                    var len = $(timepick_ul).find("li.bg-green").length;
                    if(len==1){
                        $(obj).toggleClass('bg-green');
                    }
                    if(len != 1){
                        $(obj).addClass('bg-green');
                    }
                    // 删除区间后面bg-green类
                    for(var n=index;n<$(timepick_ul_li).length;n++){
                        $(timepick_ul_li).eq(n+1).removeClass('bg-green');
                    }
                }
                if(_value){
                    // 弹出框
                    $("body").append('<section id="diglogTimepick" class="LAPP-component-dialog-failure" style="top:50px;">'+_value+'</section>');
                    setTimeout(function(){
                        $("#diglogTimepick").animate({"opacity":0},500);
                        setTimeout(function(){
                            $("#diglogTimepick").remove();
                        },501);
                    },2000);
                }
                __totalnum(timepick_ul_li);
            }
        };
    };
    LAPP.Component.Timepick = Timepick;
})(window);