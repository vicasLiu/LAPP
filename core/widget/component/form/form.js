/**
 * Created by Gaotd on 15/1/10.
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
        'css/component/form/form.css',
        'core/widget/basic/widgetHub.js'
    ];
    var createHtml = function (args) {
        var tpl = createTpl(args)
            , html = ''
            , op =args.op
            , data = op.data 
            , formData = args.componentData
            , btn = {listData: data,args:op,formData:formData};
        html = juicer(tpl, btn);
        return html;
    };
    var _widgetEvent = [], // 事件
        _args_fn;
    var _index_0 = function(_formData){
        _args_fn = function(data){
            if( !data.fn ){
                if(_formData){
                    var _field = _formData[data.field];
                    if(_field){
                        data.value = _field
                    }
                }
            }
            var _data = {
                id : data.id,
                tempValue: data.value || '',
                dataValue: data.value || '',
                text: data.value || '',
                evtType: data.type || 'text',
                evtClass: '',
                dataKey: data.field || '',
                Key: data.field || '',
                groupId: data.groupId || '',
                orderId: data.orderId || '',
                subType: 'text',
                verify: false
            }
            _data = $.extend(true,data,_data);
            return _data;
        }
    }
    var listData_fn = function(data,obj){
        var fn = obj.fn,
            _value = '';
        if( $.isFunction(fn) ){
            _value = fn(data);
            if(_value){
                obj.value = _value;
            }
        }
    }
    var createTpl = function (args) {
        var op = args.op,
            _html = '',
            data = args.data,i,n,j,_args,
            editors = op.edit || 'notEdit',
            id = op.id,
            button = op.button,
            _value = function(_index,key,value){
                var html = '';
                html += '{@if formData['+_index+']}';
                html += '{@if formData['+_index+']['+key+']}${formData['+_index+']['+key+']}{@else}${'+value+'}{@/if}';
                html += '{@else}${'+value+'}{@/if}';
                return html;
            };
        _html += '<figure class="LAPP-form-group" id="'+id+'">';
        _html += '{@each listData as item,_index0}';
        _html += '$${formData[_index0]|_index_fn}';
        juicer.register('_index_fn', _index_0);
        _html += '<figcaption class="LAPP-form-group-title {@if !item.title.show}dn{@/if}" data-key="${item.title.key}" data-value="'+_value('_index0','item.title.key','item.title.value')+'">'+_value('_index0','item.title.key','item.title.value')+'</figcaption>';

        // 第一种数据格式
        _html += '{@if !item.isTogglepanel}';
        _html += '<ul class="LAPP-form-group-ul">';
        _html += '{@each item.data as ulItem}';
        _html += '$${[formData[_index0],ulItem]|_links_build}';
        var  listData = function(data){
            listData_fn(data[0],data[1]);
        }
        juicer.register('_links_build',listData);
        _html += '<li ';
        _html += '{@if args.edit == "allEditors" && ulItem.type == "select"}class="islink-icon"{@/if}';
        _html += '{@if args.edit == "partEditors" && ulItem.edit && ulItem.type == "select"}class="islink-icon {@if ulItem.type === "hidden"}dn{@/if}"{@/if}';
        _html += '>';
        _html += '{@if ulItem.type === "hidden"}<input class="form_span formSubmit${ulItem.orderId}" subType="" orderId="${ulItem.orderId}" groupId="${ulItem.groupId}" type="hidden" verify="${ulItem.verify}" data-key="${ulItem.field}" data-value="{@if ulItem.fn}$${ulItem.fn()}{@else}'+_value('_index0','ulItem.field','ulItem.value')+'{@/if}" />{@else}';
        _html += '<label class="dd_label{@if ulItem.labelCls} ${ulItem.labelCls}{@/if}">$${ulItem.label}</label>';
        _html += '<div id="${ulItem.id}" class="dd_div_r ${ulItem.groupId}" ';
        _html += 'subType="text" orderId="{@if ulItem.orderId}${ulItem.orderId}{@else}${ulItem.field}{@/if}" groupId="${ulItem.groupId}" el-type="${ulItem.type}" data-key="${ulItem.field}" data-value="{@if formData[_index0]}${formData[_index0][ulItem.field]}{@/if}">';

        // 全部不可以编辑
        _html += '{@if args.edit == "notEdit" || !args.edit }';
        _html += '{@if ulItem.type == "password"}******{@else}';
        _html += '{@if ulItem.fn}$${ulItem.fn()}{@else}' + _value('_index0','ulItem.field','ulItem.value');
        _html += '{@/if}{@/if}{@/if}';       
        // 全部可以编辑
        _html += '{@if args.edit == "allEditors"}';
        _html += '$${ulItem|links_build0}';
        var  __listData0 = function(data){
            var obj = LAPP.widgetHub.fac(data.type, _args_fn(data));
            _widgetEvent.push(obj.Event); 
            return obj.html;
        }
        juicer.register('links_build0', __listData0);
        _html += '{@/if}';
         // 部分可以编辑
        _html += '{@if args.edit == "partEditors"}';
        _html += '{@if ulItem.edit }'; // 
        _html += '$${ulItem|links_build0}';
        var  __listData0 = function(data){
            var obj = LAPP.widgetHub.fac(data.type, _args_fn(data));
            _widgetEvent.push(obj.Event); 
            return obj.html;
        }
        juicer.register('links_build0', __listData0);
        _html += '{@else}';
        _html += '{@if ulItem.type == "password"}******{@else}';
        _html += '{@if ulItem.fn}$${ulItem.fn()}{@else}'+_value('_index0','ulItem.field','ulItem.value')+'{@/if}{@/if}{@/if}';

        _html += '{@/if}';
        _html += '</div>{@/if}';
        _html += '</li>';
        _html += '{@/each}';
        _html += '</ul>{@/if}';


        // 第二种数据格式
        _html += '{@if item.isTogglepanel}<dl class="LAPP-form-group-dl">';
        _html += '{@each item.data as item1,_index1}';
        _html += '<dt {@if item1.show }class="active"{@/if} data-key="${item1.title.key}" data-value="'+_value('_index1','item1.title.key','item1.title.value')+'">'+_value('_index1','item1.title.key','item1.title.value')+'</dt>';
        _html += '<dd {@if !item1.show }class="dn"{@/if}>';
        _html += '{@each item1.data as item2,_index3}';
        _html += '$${[formData[_index1],item2]|_links_build1}';
        var  listData1 = function(data){
            listData_fn(data[0],data[1]);
        }
        juicer.register('_links_build1',listData1);
        // 
        _html += '<div id="${item2.id}" class="dd_div_list ';
        _html += '{@if args.edit == "allEditors" && item2.type == "select"}islink-icon{@/if}';
        _html += '{@if args.edit == "partEditors" && item2.edit && item2.type == "select"}islink-icon{@/if}';
        _html += '">';
        _html += '<label class="dd_label{@if item2.labelCls} ${item2.labelCls}{@/if}">$${item2.label}</label>';
        _html += '{@if item2.type === "hidden"}<input class="form_span formSubmit${item2.orderId}" subType="" orderId="${item2.orderId}" groupId="${item2.groupId}" type="hidden" verify="${item2.verify}" data-key="${item2.field}" data-value="'+_value('_index0','item2.field','item2.value')+'" />{@else}';
        _html += '<div class="dd_div_r ${item2.groupId}" ';
        _html += 'subType="text" orderId="{@if item2.orderId}${item2.orderId}{@else}${item2.field}{@/if}" groupId="${item2.groupId}" el-type="${item2.type}" data-key="${item2.field}" data-value="{@if formData[_index0]}${formData[_index0][item2.field]}{@/if}">';  


        // 全部不可以编辑
        _html += '{@if args.edit == "notEdit" || !args.edit }';
        _html += '{@if item2.type == "password"}******{@else}';
        _html += '{@if item2.fn}$${item2.fn()}{@else}'+_value('_index0','item2.field','item2.value');
        _html += '{@/if}{@/if}{@/if}';       
        // 全部可以编辑
        _html += '{@if args.edit == "allEditors"}';
        _html += '$${item2|links_build}';
        var  __listData = function(data){
            var obj = LAPP.widgetHub.fac(data.type, _args_fn(data));
            _widgetEvent.push(obj.Event); 
            return obj.html;
        }
        juicer.register('links_build', __listData);
        _html += '{@/if}';
         // 部分可以编辑
        _html += '{@if args.edit == "partEditors"}';
        _html += '{@if item2.edit }'; // 
        _html += '$${item2|links_build}';
        var  __listData = function(data){
            var obj = LAPP.widgetHub.fac(data.type, _args_fn(data));
            _widgetEvent.push(obj.Event); 
            return obj.html;
        }
        juicer.register('links_build', __listData);
        _html += '{@else}';
        _html += '{@if item2.type == "password"}******{@else}';
        _html += '{@if item2.fn}$${item2.fn()}{@else}'+_value('_index0','item2.field','item2.value')+'{@/if}{@/if}{@/if}';
        _html += '{@/if}';
        _html += '</div>{@/if}';
        _html += '</div>';
        _html += '{@/each}';
        _html += '</dd>';
        _html += '{@/each}';
        _html += '</dl>{@/if}'
        _html += '{@/each}';
        _html += '</figure>';
        return _html;        
    };
    var Form = function (args) {
        var data = args.op.data;
        LAPP.Util.loadSources(data,function(arr){
            url = url.concat(arr);
        });
        var cb = args.callback;
        seajs.use(url, function(){
            _widgetEvent = [];
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
                LAPP.Events.bindEvent($('.LAPP-form-group-dl>dt'), '', "click",function(e){
                    var _self = $(e),
                        _next = _self.next();
                    _self.toggleClass("active");
                    _next.toggleClass('dn');
                });
                var len = _widgetEvent.length,
                    i = 0;
                for( ;i<len;i++ ){
                    var _wid_fn = _widgetEvent[i];
                    if($.isFunction(_wid_fn)){
                        _wid_fn();
                    };
                }
            }
        });
    };
    LAPP.Component.Form = Form;
})(window);