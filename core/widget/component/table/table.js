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
        "css/component/table/table.css",
        "core/widget/component/iscroll/iscroll.js"
    ];
    var createHtml = function (args) {
        var op  = args.op
            , render = op.render
            , tpl = __createTpl(args)
            , _args_data = op.data
            , table  = {
                formData : args.componentData,
                PercentData : _args_data.tPercent,
                tHeadData : _args_data.tHead,
                tBodyData : _args_data.tBody,
                tFooter: _args_data.tFooter
            }
            , html = '';
        html += juicer(tpl, table);
        return html;
    };
    var __createTpl = function(args) {
        var op = args.op,
            id = op.id,
            PercentData = op.data.tPercent || '',
            _width = PercentData ? 'width="${PercentData[index0]}"' : '', // 按照百分比
            _html = '';
            _html += '<section id="'+id+'" class="noWidth-section">';
            _html += '{@each tHeadData as tHeadDataIitem, tHeadDataIndex}\
                        <h3>{@if formData.tHead[tHeadDataIndex][tHeadDataIitem.field]}${formData.tHead[tHeadDataIndex][tHeadDataIitem.field]}{@else}${tHeadDataIitem.label}{@/if}</h3>\
                      {@/each}';
            if( PercentData.length == 0 ){
                _html += '<div id="' + id + 'Table">';
            }
            _html += '<table ' + ( _width ? 'width="100%"' : '' ) + ' class="LAPP-component-tab-table">';
            _html += '<thead><tr>';
                _html += '{@each tBodyData as item, index0}';
                    _html += '<th '+_width+'>${item.label}</th>';
                _html += "{@/each}";
            _html += '</tr></thead>';
                _html += '{@each formData.tBody as item, index}'; 
                _html += '<tr>';
                    _html += '{@each tBodyData as item1, index1}';
                    _html += '<td>${item[item1.field]}</td>'; 
                    _html += "{@/each}";
                _html += '</tr>';
                _html += "{@/each}";
            _html += '</table>';
            if( PercentData.length == 0 ){
                _html += '</div>';
            }
            _html += '{@each tFooter as tFooteritem,tFooterIndex}\
                      <div class="tFooter-div">${tFooteritem.label}：${formData.tFooter[tFooterIndex][tFooteritem.field]} </div>\
                    {@/each}';
            _html += '</section>';
        return _html;
    };
    var Table = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
                if(!args.op.data.tPercent){
                    var id = args.op.id,
                        myScroll = new iScroll(id+'Table',{
                        hScrollbar:false,  
                        hScroll: true, 
                        vScrollbar:false,  
                        vScroll: false,
                    });
                }
            }
        });
    };
    LAPP.Component.Table = Table;
})(window);