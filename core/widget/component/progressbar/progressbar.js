/**
 * Created by Gaotd on 15/1/4.
 */
"use strict";
if(!LAPP){
    var LAPP = {};
};
if (!LAPP.Component) {
    LAPP.Component = {};
}
(function (win, undefined) {
    var url = [
        "css/component/progressbar/progressbar.css", // blue
        // "css/component/progressbar/progressbarOrange.css",  // Orange
        // "css/component/progressbar/progressbarPurple.css",  // Purple
        "css/component/toast/toast.css",
        "core/widget/component/iscroll/iscroll.js"
    ];
    var createHtml = function (args) {
        var _date = new Date(),
            _Tdate = _date.getFullYear() + '-' + ( _date.getMonth() + 1 ) + '-' + _date.getDate(),// 获取当前日期
            componentData = args.componentData || {},
            yearMonth = componentData.yearMonth,
            beginData = componentData.beginData ? componentData.beginData : _Tdate ,
            endData = componentData.endData ? componentData.endData : (new Date( Date.parse(beginData) + ( 86400000  *  59 ) )),
            arrData = [],i = 0,
            defaultData = componentData.defaultData ? componentData.defaultData : _Tdate;   // 如果不设置默认则选中的中当天
        // 设置一个月份格式YYYY-M (beginData和endData必须不存在的时候才生效) 
        if( !componentData.beginData && !componentData.endData ){
            var _yearMonth = yearMonth.split('-'),
                _yDate = new Date(_yearMonth[0],_yearMonth[1],0),
                yearMonthDate = _yDate.getDate(),
                beginData = yearMonth + '-' + 1,
                endData = yearMonth + '-' + yearMonthDate;
        }
        var newBeginData = new Date( beginData ),  // 开始时间        
            newEndData = new Date( endData ),    // 结束时间
            newTime = newEndData.getTime() - newBeginData.getTime(),  //时间差的毫秒数        
            days = Math.floor( newTime/(24*3600*1000) );  // //计算出相差天数
        function  dateAdd(NumDay,dtDate)  { 
            var dtTmp = new Date( dtDate ),
                d,_newData,_arr = {},x; 
            if( isNaN(dtTmp) ){
                dtTmp = new Date();
            }
            _newData = new Date( Date.parse(dtTmp) + ( 86400000  *  NumDay ) );
            d = new Date(_newData);
            x = ( new Array("星期日", "星期一", "星期二","星期三","星期四", "星期五","星期六") )[d.getDay()];
            _arr = {
                y : d.getFullYear(),
                m : d.getMonth() + 1,
                d : d.getDate(),
                w : x
            }
            return  _arr;
        }
        days = days > 61 ? 60  : days;  // 时间跨度必须小于获得等于两个月,
        for( ; i <=days ; i++ ){
            var _data = dateAdd(i,beginData),
                _y_m = _data.y + '-' + _data.m,
                _w = _data.w,
                _d = _data.d;
            arrData.push({
                year : _y_m,
                week : _w,
                data : _d,
                expiredData : ( new Date( _y_m+'-'+ _data.d ) ) >= ( new Date( _Tdate ) ),
                defaultData :  ( ( _y_m+'-'+ _data.d ) == ( defaultData ) )
            }); 
        }
        args.componentData = arrData;
        var op  = args.op
            , render = op.render
            , tpl = __createTpl(args)
            , val  = {listData:args.componentData}
            , html = '';
        html += juicer(tpl, val);
        return html;
    };
    var __createTpl = function(args) {
        var id = args.op.id,
            data = args.componentData,
            len = data.length,
            height = args.op.liHeight || 90,
            wid = len*64,
            cls = args.op.cls,
            _html = '<section id="'+id+'"><ul class="LAPP-component-progressbar '+cls+'" style="width:'+wid+'px;height:'+height+'px">';
            _html += '{@each listData as item}'
            _html += '{@if item.year&&item.week&&item.data}';
            _html += '<li class="{@if item.defaultData}active{@/if} {@if !item.expiredData}Clsexpired{@/if}" day="${item.year}-${item.data}" state="${item.expiredData}">';
            _html += '<span class="progressbar-year">${item.year}</span>';
            _html += '<span class="progressbar-week">${item.week}</span>';
            _html += '<span class="progressbar-data">${item.data}</span>';
            _html += '</li>';
            _html += '{@/if}';
            _html += '{@/each}';
            _html += '</ul></section>'
        return _html;
    };
    var Progressbar = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);

                var id = args.op.id,
                data = args.componentData,
                data_len = data.length,i=0,
                myScroll = new iScroll(id,{
                    hScrollbar:false,  
                    hScroll: true, 
                    vScrollbar:false,  
                    vScroll: false,
                });
                for(;i<data_len;i++){
                    if(data[i].defaultData){
                        var window_wid = $(window).width(),
                            wid = (i*64 > window_wid/2) ? (i*64-window_wid/2+32) : 0;
                        $('#'+id).find('ul.LAPP-component-progressbar').css({'-moz-transform':'translate3d(-'+wid+'px, 0, 0)','-webkit-transform':'translate3d(-'+wid+'px, 0, 0)','-o-transform':'translate3d(-'+wid+'px, 0, 0)'});
                        break;
                    }
                }
                var _value = args.op.promptValue || '时间已失效';
                LAPP.Events.bindEvent($("#"+id+" ul.LAPP-component-progressbar"), 'li', "click",function(e){
                    if($("#diglogProgressbar").length == 0){
                        var state = $(e).attr("state");
                        if(state == 'true'){
                            $(e).addClass('active').siblings().removeClass('active');
                        }else{
                            // 弹出框
                            $("body").append('<section id="diglogProgressbar" class="LAPP-component-dialog-failure" style="top:50px;">'+_value+'</section>');
                            setTimeout(function(){
                                $("#diglogProgressbar").animate({"opacity":0},500);
                                setTimeout(function(){
                                    $("#diglogProgressbar").remove();
                                },501);
                            },2000);
                        }
                    }
                });
            }
        });
    };
    LAPP.Component.Progressbar = Progressbar;
})(window);