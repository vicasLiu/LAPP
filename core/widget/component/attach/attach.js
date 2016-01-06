/**
 * Created by Gaotd on 2015-1-10.
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
        "css/component/attach/attach.css",
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
            _html = '',n=0,
            editable = op.editable,
            len = args.componentData.length,
            _newL = editable ? len+1 : len,
            win_wid = $(window).width(),
            _L = op.number || 4,
            _W = (win_wid-66*_L)/(_L+1),
            _parseInt_len =  parseInt(_newL/_L),
            _len = _newL%_L ? _parseInt_len + 1 : _parseInt_len,
            wid = len ? 'width:'+win_wid*_len+'px;' : '',
            margin_left = 'margin-left:' + _W + 'px;',
            isIscroll = op.isIscroll,
            id = op.id;
        if(isIscroll){
            $("<style id='args_win_wid'>").html('').appendTo($('head'));
            $("#args_win_wid").append('.LAPP-component-attach-pic>a:nth-child('+_L+'n+1){margin-left:'+(_W)*2+'px!important;}.LAPP-component-attach-pic>a:first-child{margin-left:'+_W+'px!important;}');
        }
        _html += '<section class="LAPP-component-attach" id="'+id+'">';
        if(isIscroll){
        	_html += '<div class="LAPP-component-attach-kk" style="padding-bottom:15px;" id="'+id+'Scroll">';
	        _html += '<div class="LAPP-component-attach-pic" style="'+wid+'">';
	    }else{
	    	_html += '<div class="LAPP-component-attach-kk" style="height:auto;width:100%;">';
	    	_html += '<div class="LAPP-component-attach-pic" style="height:auto;width:100%;">';
	    }
        if(editable){
	        _html += '<a href="javascript:void(0);" class="icon-add" style="'+margin_left+'">添加附件</a>';
	    }
	    _html += '{@each listData as item,index}';
	    _html += '<a href="javascript:void(0);" style="'+margin_left+'" data-arr="${item.data}" data-filePath="${item.filePath}" class="{@if item.type === "image"} icon-photo{@/if}';
	    _html += '{@if item.type === "video"} icon-video{@/if}';
	    _html += '{@if item.type === "audio"} icon-audio{@/if}';
	    _html += '"><img src="${item.filePath}" onerror="javascript:this.style.display=\'none\';{@if item.type === "image"}$(this).parent().addClass(\'imgNone\');{@/if}" /></a>';
	    _html += '{@/each}';
        _html += '</div>';
        if(isIscroll){
            _html += '<div class="LAPP-component-attach-dot">';
            for(;n<_len;n++){
                if(n==0){
                    _html += '<a href="javascript:void(0);" class="active"></a>';
                }else{
                    _html += '<a href="javascript:void(0);"></a>';
                }
            }
            _html += '</div>';
        }
        _html += '</div>';
        _html += '</section>';
        return _html;
    };
    var Attach = function (args) {
        var cb = args.callback,
            _myScroll = '';
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm, _myScroll);
                var id = args.op.id+'Scroll',
                    _index = 0;
                if(!_myScroll) {
                    _myScroll = new iScroll(id, {
                        checkDOMChanges:true,
                        snap: true,
                        momentum: false,
                        hScrollbar: false,
                        vScroll : false,
                        onScrollEnd: function () {
                            _index = this.currPageX;
                            var _dot_a = '#' + id + ' .LAPP-component-attach-dot>a',
                                _len = $(_dot_a).length;
                            console.log(_index)
                            if(_index >= _len){
                                _index = _len-1;
                            }
                            document.querySelector(_dot_a+'.active').className = '';
                            document.querySelector(_dot_a+':nth-child(' + (_index+1) + ')').className = 'active';
                        }
                     });
                } else {
                    _myScroll.refresh();
                }
                // 重新计算iscroll和小点数量
                // var _attach_fn = function(_parent){
                //     var _L = args.op.number || 4,i = 0,
                //         _len = _parent.find('a').length,
                //         _parseInt_len =  parseInt(_len/_L),
                //         _newlen = _len%_L ? _parseInt_len + 1 : _parseInt_len,
                //         win_wid = $(window).width(),
                //         _wid = win_wid*_newlen,_html = '';
                //     _parent.width(_wid); // 重新设置宽度
                //     if( _newlen == _index){
                //         _index--;
                //     }
                //     for( ; i < _newlen ; i++ ){
                //         _html += '<a href="javascript:void(0)" ' + ( (i==_index) ? 'class="active"' : '' ) + '></a>';
                //     }
                //     $('#' + id + ' .LAPP-component-attach-dot').html(_html); // 重新加载小点
                //     _myScroll.refresh(); // 刷新
                // }
                // LAPP.Events.bindEvent($('#' + id + ' .icon-add'), '', "click",function(e){
                //     var _this = $('#' + id + ' .icon-add'),
                //         _parent = _this.parents('.LAPP-component-attach-pic'),
                //         margin_left = $('.icon-add').attr('style'),
                //         _html ='<a href="#" class="icon-video" style="'+margin_left+'"><em class="remove remove-attach"></em></a>';
                //     _parent.append(_html);
                //     _attach_fn(_parent);
                // });
                // $('.remove-attach').live('click',function(){
                //     var _parent = $(this).parents('div.LAPP-component-attach-pic');
                //     $(this).parent().remove();
                //     _attach_fn(_parent);
                // })
            }
        });
    };
    LAPP.Component.Attach = Attach;
})(window);