/**
 * Created by Gaotd on 2015-2-10.
    @include
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
        'css/component/monthgroup/monthgroup.css',
        'css/widgetBasic.css',
        'core/widget/basic/button.js',
        'core/widget/component/iscroll/iscroll.js'

    ];
    var createHtml = function (args) {
        var tpl = createTpl(args)
            , html = ''
            , data = args.op.data 
            , listData = {listData: data,formData:args.componentData};
        html = juicer(tpl, listData);
        return html;
    };
    var createTpl = function (args) {
        var op = args.op,
            _html = '',
            id = op.id,
            _data = op.data.data,
            listData = op.data,
            button = op.button;
        _html += '<section id="' + id + '" class="LAPP-component-monthgroup">'
        _html += '<h3 class="LAPP-component-monthgroup-h3 {@if !listData.title.show}dn{@/if}">{@if formData[listData.title.key]}${formData[listData.title.key]}{@else}${listData.title.value}{@/if}</h3>';
        for( var i = 0 ; i < _data.length ; i++ ){
            _html += '<div class="LAPP-component-monthgroup-group">';
            for( var n = 0 ; n < _data[i].length ; n++ ){
                var _new_data = _data[i][n],
                    _formData = args.componentData;
                if(_formData[_new_data['field']]){
                    if( _new_data.isSelected ){
                        _new_data.cls = _new_data.cls ? ( _new_data.cls + ' active' ) : ' active';
                    }
                    _new_data.text = _formData[_new_data['field']];
                }
                _html += LAPP.Widget.Button(_new_data);
            }
            _html += '</div>'
        }
        _html += '</section>';
        return _html;
    };
    var Monthgroup = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
                LAPP.Events.bindEvent($('.LAPP-component-monthgroup-group'), 'a', "click",function(e){
                    $(e).addClass('active').siblings().removeClass('active');
                });
            }
        });
    };
    LAPP.Component.Monthgroup = Monthgroup;
})(window);