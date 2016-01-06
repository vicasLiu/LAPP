/**
 * Created by Gaotd on 15/1/5.
    @include input
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
        'css/component/search/search.css',   // blue
        // "css/component/search/searchOrange.css",  // Orange
        // "css/component/search/searchPurple.css",  // Purple
        'css/widgetBasic.css',
        'core/widget/basic/input.js'
    ];
    var createHtml = function (args) {
        var op  = args.op
            , render = op.render
            , tpl = __createTpl(args)
            , val  = {}
            , html = '';
        html += juicer(tpl, val);
        return html;
    };
    var __createTpl = function(args) {
        var op = args.op,
            id = op.id,
            _html = '',
            args1 = {
                type: op.type,
                placeholder: op.placeholder,
                id: id+'Search',
                clearNeed: op.clearNeed,
                text: op.text,
                cls: op.cls
            };
            _html += '<section id="'+id+'" class="LAPP-component-search">';
            _html += '<div class="LAPP-component-search-div">';
            _html += '<div class="LAPP-component-search-div-bg">'+LAPP.Widget.Input(args1).html()+'</div>';
            _html += '<a href="javascript:void(0);" class="search-btn">取消</a>';
            _html += '</div>';
            _html += '</section>';
        return _html;
    };
    var Search = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
                var temp,_val_len,
                    id = args.op.id,
                    _clearButton = '#'+id+' .LAPP-input-clearButton',
                    _btn = $('#'+id+' .search-btn'),
                    _searchBtn = 'searchBtn',
                    btn_active = 'search-btn-active',
                    div_active = 'LAPP-component-search-div-active',
                    search_div = '#'+id+' .LAPP-component-search-div';
                // 获取焦点
                $('body').delegate(search_div+'-bg', 'focus', function () {
                    $(search_div).addClass(div_active);
                    _btn.addClass(btn_active);
                    temp = setInterval(function(){
                        _val_len = $(search_div+' input').val().length;
                        if(_val_len > 0){
                            _btn.text("搜索").addClass(_searchBtn);
                            $(_clearButton).show();
                        }else{
                            _btn.text("取消").removeClass(_searchBtn);
                            $(_clearButton).hide();
                        }
                    },50)
                });
                // val改变的时候
                $('body').delegate(search_div+' input', 'blur', function () {
                    clearInterval(temp);
                    if(!_val_len){
                        $(search_div).removeClass(div_active);
                        _btn.text("取消").removeClass(btn_active);
                    }
                });
                LAPP.Events.bindEvent($(_clearButton), '', "click",function(e){
                    $(e).hide();
                    _btn.removeClass(_searchBtn);
                    $(_clearButton).prev().val('');
                    _btn.text("取消");
                });
                LAPP.Events.bindEvent($(_btn), '', "click",function(e){
                    $(search_div).removeClass(div_active);
                    _btn.text("搜索").removeClass(btn_active);
                });
            }
        });
    };
    LAPP.Component.Search = Search;
})(window);