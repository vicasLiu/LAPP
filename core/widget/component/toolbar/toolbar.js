/**
 * Created by Gaotd 2015-1-22.
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
        "css/component/toolbar/toolbar.css",   // blue
        // "css/component/toolbar/toolbarOrange.css",  // Orange
        // "css/component/toolbar/toolbarPurple.css"  // Purple
    ];
    var createTpl = function (args) {
			var op = args.op
			  , id = op.id
			  , btnNum = args.componentData.length
			  , renderTarget = op.render
			  //中间标题
			  , btnGroup = '<div class="LAPP-toolbar-btnGroup">' +
			     '{@each btnData as item}' +
			            '{@if item.type =="title"}' +
			                '${item.text}' +
			            '{@/if}' +
			     '{@/each}'+
			     '</div>'
			//左右两端跳转
			  , html = '{@each btnData as item, index}' +
                '{@if item.type !== "title"}' +
                    '{@if item.fn = undefined}' +
                        '<a href="javascript:void(0);"  style="display:'+
                            '{@if item.show}' +
                                'block' +
                            '{@else}' +
                                'none' +
                            '{@/if}' +
                        '" class="${item.type}">${item.text}</a>' +
                        '{@else}' +
                        '<a href="javascript:void(0);" onclick="${item.fn}" style="display:' +
                            '{@if item.show}' +
                                'block' +
                            '{@else}' +
                              'none' +
                            '{@/if}' +
                            '" class="${item.type}">${item.text}</a>' +
                        '{@/if}' +
                '{@/if}' +
            '{@/each}';
			html ='<div id="'+ id + '" class="LAPP-toolbar">' + html + btnGroup +'</div>';
            $(function () {
                $('.LAPP-toolbar-btnGroup').width(130);
            })
			if( LAPP.Util.isObject(op.css) ) { 
				$('#'+renderTarget).css(op.css);
			}
			return html;
		};
		var createHtml = function (args) {
			var tpl = createTpl(args)
			 	, html = ''
				, data = args.op.ele || args.componentData 
				, btn = {btnData: data};
			html = juicer(tpl, btn);
			return html;
	};

    var Toolbar = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
            }
        });
    };
    LAPP.Component.Toolbar = Toolbar;
})(window);