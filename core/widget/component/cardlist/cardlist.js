/**
 * Created by Gaotd on 2014-1-15.
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
        "css/component/cardlist/cardlist.css",
    ];
    var createHtml = function (args) {
        var tpl = createTpl(args)
            , op = args.op
            , html = ''
            , data = op.ele || op.data
            , btn = { listData : data , formData : args.componentData };
        html = juicer(tpl, btn);
        return html;
    };
    var createTpl = function (args) {
        var op = args.op,
            _html = '',
            id = op.id,
            _title = op.data.title.field,
            isIcon = op.isIcon ? 'class="entry-trangle"' : 'class="dn"';
        _html += '<section class="LAPP-component-cardlist" id="'+id+'">\
                    {@each listData.head as itemHead,itemHeadIndex}\
                        <div class="LAPP-component-cardlist-head">${itemHead.label}：${formData.head[itemHeadIndex][itemHead.field]}</div>\
                    {@/each}\
                    <dl class="LAPP-component-cardlist-list">\
                        {@each formData.title as itemTitle,Tindex}\
                            <dt class="LAPP-component-cardlist-list-title" data-value="{@if itemTitle["'+_title+'"]}${itemTitle["'+_title+'"]}{@else}${listData.title.label}{@/if}" data-key="${listData.title.field}">{@if itemTitle["'+_title+'"]}${itemTitle["'+_title+'"]}{@else}${listData.title.label}{@/if}</dt>\
                        {@each formData.list[Tindex] as itemList,index}\
                            <dd class="LAPP-component-cardlist-list-dd">\
                                <span '+isIcon+'><em>{@if index<10}0$${++index}{@/if}</em></span>\
                                {@each listData.list as itemData,itemDataIndex}\
                                    {@if itemData.fn}\
                                        <div class="${itemData.cls} LAPP-component-cardlist-list-dd-div" data-key="${itemData.field}" data-value="${itemList[itemData.field]}">';
                                        _html += '$${[itemData,itemList]|_links_build}';
                                        var  listData = function(data){
                                            if( $.isFunction(data[0].fn) ){
                                                return data[0].fn(data[1]);
                                            }
                                        };
                                        juicer.register('_links_build',listData);
                                        _html += '</div>\
                                    {@else}\
                                        <p data-key="${itemData.field}" data-value="${itemList[itemData.field]}"><label>${itemData.label}</label><span>${itemList[itemData.field]}</span></p>\
                                    {@/if}\
                                {@/each}\
                            </dd>\
                        {@/each}\
                        {@/each}\
                    </dl>';
        _html += '{@each listData.footer as itemFooter,itemFooterIndex}\
                    <div class="LAPP-component-cardlist-footer">${itemFooter.label}：${formData.footer[itemFooterIndex][itemFooter.field]}</div>\
                {@/each}';
        _html += '</section>';
        return _html;
    };
    var Cardlist = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
            }
        });
    };
    LAPP.Component.Cardlist = Cardlist;
})(window);