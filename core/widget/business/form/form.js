/**
 * @File 表单组件
 * @Import
 * @CreatedBy LAPP Mobile Components Development Group
 * @GroupMember LiuSiWei ZhangHang
 * @Email suchiva@126.com
 * @Module LAPP
 * @Date 2014-01-24
 */
"use strict";
if (!LAPP) {
    var LAPP = {};
}
(function() {
    var subEvent = function( inst ) {
        var evts = new Map()
            , me = inst
            , control = inst.control;
        evts.put("componentLoadedFinished", function( arg ){
            control.handleFinished( me, arg );
        }, inst);
        evts.put("submitData", function( arg ){
            control.submitData(  me, arg );
        }, inst);
        evts.put("publishParam", function( arg ) {
            control.receiveParam( me, arg );
        }, inst);
        evts.put("publishPageParam", function(arg) {
            me.setFormFile(arg);
        }, inst);
        evts.put("getParam", function(arg) {
            control.getParamData(me);
        }, inst);
        evts.put("pComponentParam", function( arg ) {
            me.setFormFile(arg);
        }, inst);

        evts.put("add", function( arg ) {
            me.add(arg);
        }, inst);
        evts.put("remove", function( arg ) {
            me.remove(arg);
        }, inst);
        evts.put("edit", function( arg ) {
            me.editFun(arg);
        }, inst);
         evts.put("empty", function( arg ) {
            me.empty(arg);
        }, inst);
        evts.put("dataFinish", function( data ) {
            control.receiveData(me, data);
        }, inst);
        evts.put("scanFinished", function( arg ) {
            control.setFormFile( me, arg );
        }, inst);
        evts.put("VocationListFinished", function( arg ) {
            me.setOptions( me, arg );
        }, inst);
        return evts;
    };

    var View = function( inst ) {
        this.createHtml = function(dbData, data, self, op) {
            // var allForm = ''; //所有表单
            // var columnName = []; //栏目名称
            // var arg = self.dyParam;

            // $.each(data, function(key, value) {
            //     var isHideTitle = op.isHideTitle[key] ? 'isHideTitle' : '';
            //     if (value["mainId"] == undefined) {
            //         value["mainId"] = key;
            //     }
            //     for (var i in value) {
            //         if (i != "mainId") {
            //             columnName.push(i);
            //         }
            //     }
            //     var show = true;
            //     if (value[columnName[key]]['show'] != undefined) {
            //         var showCb = value[columnName[key]]['show'];
            //         if ($.isFunction(showCb)&&arg) {
            //             show = showCb(arg);
            //         } else {
            //             show = showCb;
            //         }
            //     }
            //     if (!show) {
            //         return;
            //     }
            //     var hTitle = columnName[key];
            //     if (value[columnName[key]]['title'] != undefined) {
            //         var _t = value[columnName[key]]['title'];
            //         var _tKey = _t["key"];
            //         var _tFn = _t["fn"];
            //         if( dbData == undefined || dbData[_tKey] == undefined ) {
            //             if( $.isFunction(_tFn) ) {
            //                 hTitle = _tFn();
            //             }
            //         }else if (dbData[_tKey] != undefined) {
            //             if ($.isFunction(_tFn)) {
            //                 hTitle = _tFn(dbData[_tKey]);
            //             } else {
            //                 hTitle = dbData[_tKey];
            //             }
            //         }
            //     }
            //     var singleColumn = '<dl class="LAPP-form-dl" id="form_' + key + '">' + '<dt class="hClick ' + isHideTitle + '"><span>slide</span>' + hTitle + '</dt>';

            //     if (value[columnName[key]]['formSummary'] == undefined || value[columnName[key]]['formSummary'].length == 0 || value[columnName[key]]['formMain'] == undefined || value[columnName[key]]['formMain'].length == 0) {
            //         singleColumn += '<dd class="LAPP-form-dl-dd">';
            //     } else {
            //         singleColumn += '<dd class="LAPP-form-dl-dd">';
            //         var tempFieldSummary = '',
            //             formSummary = value[columnName[key]]['formSummary']; //表单简介字段
            //         for (var i = 0; i < formSummary.length; i++) {
            //             tempFieldSummary = '';
            //             for (var j = 0; j < formSummary.length; j++) {
            //                 var tempLabel = formSummary[j]['label'],
            //                     tempField = dbData ? dbData[formSummary[j]['field']] : "",
            //                     tempFieldType = formSummary[j]['type'];
            //                 tempFieldSummary += '<p><label class="' + formSummary[i]['field'] + '">' + tempLabel + '</label><span class="' + tempFieldType + '">' + tempField + '</span></p>';
            //             }
            //         }
            //         tempFieldSummary += '</dd><dd class="LAPP-form-dl-dd">';
            //         singleColumn += tempFieldSummary;
            //     }
            //     if (value[columnName[key]]['formMain'] == undefined || value[columnName[key]]['formMain'].length == 0) {
            //         var tempRendervalue = value[columnName[key]]['render'];

            //         singleColumn += '<dd id="' + tempRendervalue + '">tempRendervalue</dd></dl>';
            //     } else {
            //         var formMainData = [];
            //         if (value[columnName[key]]['dbData'] != undefined) {
            //             var dbDataKey = value[columnName[key]]['dbData'];
            //             if (dbData[dbDataKey] != undefined) {
            //                 if (!$.isArray(dbData[dbDataKey])) {
            //                     formMainData.push(dbData[dbDataKey]);
            //                 } else {
            //                     formMainData = dbData[dbDataKey];
            //                 }
            //             }
            //         }
            //         if (formMainData.length == 0) {
            //             formMainData.push(dbData);
            //         }
            //         var tempFieldMain, formMain = value[columnName[key]]['formMain']; //表单其他字段
            //         for (var ii = 0; ii < formMainData.length; ii++) {
            //             var dbFData = formMainData[ii];
            //             for (var i = 0; i < formMain.length; i++) {
            //                 tempFieldMain = '<div class="formMain_detail">';
            //                 var tempFieldFn = formMain[i]['fn'];
            //                 for (var j = 0; j < formMain.length; j++) {
            //                     var tempLabel = formMain[j]['label'],
            //                         key = formMain[j]['key'] ? formMain[j]['key'] : formMain[j]['field'],
            //                         field = formMain[j]['field'],
            //                         tempField = dbFData ? dbFData[field] : "",
            //                         need = formMain[j]['need'],
            //                         evt = formMain[j]['evt'] ? formMain[j]['evt'] : false,
            //                         className = "formSubmit",
            //                         verify = formMain[j]['verify'] ? formMain[j]['verify'] : "empty",
            //                         dataValue = formMain[j]['value'],
            //                         groupId = formMain[j]['groupId'] ? formMain[j]['groupId'] : "",
            //                         orderId = formMain[j]['orderId'] ? formMain[j]['orderId'] : field,
            //                         subType = formMain[j]['subType'] ? formMain[j]['subType'] : "text",
            //                         tempFieldType = formMain[j]['type'],
            //                         fn = formMain[j]['fn'],
            //                         id = formMain[j]['id'] ? formMain[j]['id'] : "";

            //                     if (need == undefined) {
            //                         need = true;
            //                     };
            //                     if (dataValue != undefined) {
            //                         tempField = dataValue;
            //                     };
            //                     if( $.isFunction( fn ) ) {
            //                         tempField = fn( dbFData );
            //                     }
            //                     if (tempFieldType == "hidden") {
            //                         className += " " + groupId;
            //                         tempFieldMain += '<input class="form_span ' + className + '" subType="' + subType + '" orderId="' + orderId + '" groupId="' + groupId + '" type="hidden" verify="' + verify + '" data-key="' + key + '" data-value="' + tempField + '" />';
            //                     } else {
            //                         tempFieldSummary += '<p><label class="' + formMain[j]['field'] + '">' + tempLabel + '</label>' + tempField + tempFieldType + '</p>';
            //                         if (!need) {
            //                             className = "noSubmit";
            //                         }
            //                         className += " " + groupId;
            //                         if (typeof tempLabel == 'string' || tempLabel === false ) {
            //                             var display = "block";
            //                             if( tempLabel === false ) {
            //                                 display = "none";
            //                             }
            //                             if (evt) {
            //                                 var type = "evt-" + evt.type;
            //                                 var cb = evt.fun;
            //                                 self.callBackList.put(field, cb);
            //                                 tempFieldMain += '<p style="display:'+display+';" id="' + id + '"><label class="' + formMain[j]['field'] + '">' + tempLabel + '</label>' +
            //                                     '<span class="form_span ' + className + '" ' +
            //                                     '    subType="' + subType + '" ' +
            //                                     '    orderId="' + orderId + '" ' +
            //                                     '    groupId="' + groupId + '" ' +
            //                                     '    verify="' + verify + '"' +
            //                                     '    evt-type="' + type + '" ' +
            //                                     '    el-type="' + tempFieldType + '" ' +
            //                                     '    data-key="' + key + '" ' +
            //                                     '    data-value="' + tempField + '">' + tempField + '</span>' +
            //                                     '</p>';
            //                             } else {
            //                                 tempFieldMain += '<p style="display:'+display+';" id="' + id + '"><label class="' + formMain[j]['field'] + '">' + tempLabel + '</label>' +
            //                                     '<span class="form_span ' + className + '" ' +
            //                                     '    subType="' + subType + '" ' +
            //                                     '    orderId="' + orderId + '" ' +
            //                                     '    groupId="' + groupId + '" ' +
            //                                     '    verify="' + verify + '"' +
            //                                     '    el-type="' + tempFieldType + '" ' +
            //                                     '    data-key="' + key + '" ' +
            //                                     '    data-value="' + tempField + '">' + tempField + '</span>' +
            //                                     '</p>';
            //                             }
            //                         } else {
            //                             tempFieldMain += '<p><label>&nbsp;' + '</label>' + tempField + tempFieldType + '</p>';
            //                         }
            //                     };
            //                 }
            //                 if (typeof tempFieldFn != 'undefined') {
            //                     $('input').click(function() {
            //                         tempFieldFn();
            //                     });
            //                 }
            //             }
            //             tempFieldMain += '</div>';
            //             singleColumn += tempFieldMain; //表单栏目DOM
            //         }

            //         singleColumn += '</dd></dl>';
            //     }
            //     allForm += singleColumn; //添加所有栏目

            // });
            // return allForm;
            this.init(data);
        };
        this.init = function(inst,data ) {
            /*var tpl = __createHtml( inst )
                , toggle = { toggleData : data }
                , html
                ;
            html = juicer( tpl, toggle );
            inst.render(html);*/
            seajs.use("core/widget/component/form/form.js",function(){
                LAPP.Component.Form({op:inst.options,componentData:data, callback: function(htm){
                    inst.render(htm);
                }});
            });
        };
    }
    var Control = function( inst ) {
        // var dataAdapter = function(data){
        //     var op = inst.options,
        //         dataArr = [];
        //     for(var j=0; j<data.length;j++){
        //         var dataItem = data[j];
        //         var packDataItem = {};
        //         var title = {};

        //         for(var item in dataItem){
        //             title["key"] = item;
        //             title["value"] = dataItem[item]["key"]||"";
        //             packDataItem["data"]= dataItem[item]["formMain"]||[];
        //             packDataItem["isTogglepanel"] = dataItem[item]["isTogglepanel"] || false;
        //         }
        //         packDataItem["title"] = title;
        //         dataArr.push(packDataItem);
        //     }

        //     console.log(dataArr)
        //     return dataArr;

        // };
        this.handleFinished = function( inst, arg ) {

        },
        this.receiveParam = function(inst, arg) {
            inst.dyParam = arg;
            //inst.render();
        },
        this.receiveData = function(inst, data) {
            if (data == null) {
                return;
            };
            var op = inst.options,
                dbData = op['dbData'],
                formData = null;

            if( $.isFunction(op.adpter) ) {
                formData = op.adpter(data);
            }else {
                formData = data[dbData];
            }
            if (!$.isArray(formData)) {
                return;
            }
            //formData = dataAdapter(formData);
            inst.model.init(inst,formData);
            inst.setData(formData);
            //inst.render();
        },
        this.handleLoadData = function( inst, arg ) {
            var render = inst.options.render;
            var formSpan = $("#" + render).find(".dd_div_r");
            for (var i = 0; i < formSpan.length; i++) {
                var dom = $(formSpan[i]);
                var dataKey = dom.attr("data-key");
                var subId = dom.attr("orderid");
                if (subId == undefined) {
                    continue;
                }
                var data = arg[subId];
                if( data == undefined ) {
                    continue;
                }
                var value = "";
                if ($.isArray(data)) {
                    for (var k = 0; k < data.length; k++) {
                        if (data[k][dataKey] != undefined) {
                            value += data[k][dataKey];
                        }
                    }
                } else if (typeof data == "string") {
                    value = data;
                } else if (data[dataKey] != undefined) {
                    value = data[dataKey];
                }
                dom.text(value);
                dom.attr("data-value", value);
            };
        },
        this.handleCPData = function( inst, arg ) {
            if (!inst.edit) {
                return;
            };
            var gid = inst.gId;
            var formId = $("#" + inst.options.render);
            if (gid != undefined) {
                var gEles = formId.find("." + gid);
            } else {
                var gEles = formId.find(".dd_div_r");
            }
            var arr = null;
            if (arg['mutilpleLiData'] != undefined) {
                arr = arg['mutilpleLiData'];
            };
            for (var i = 0; i < gEles.length; i++) {
                var dataKey = $(gEles[i]).attr("orderId");
                var value = "";
                if (arr != null) {
                    for (var j = 0; j < arr.length; j++) {
                        if (arr[j][dataKey] != undefined) {
                            if (j > 0) {
                                value += ",";
                            }
                            value += arr[j][dataKey];
                            $(gEles[i]).attr("data-value", value);
                            $(gEles[i]).text(value);
                        }
                    }
                } else {
                    if (arg[dataKey] != undefined) {
                        $(gEles[i]).attr("data-value", arg[dataKey]);
                        $(gEles[i]).val(arg[dataKey]);
                        $(gEles[i]).text(arg[dataKey]);
                    }
                }
            }
        },
        this.setFormFile = function(inst, arg) {
            if( !LAPP.Util.isObject( arg ) ) {
                return;
            }
            if (!inst.edit) {
                this.handleLoadData(inst, arg);
            }else{
                this.handleCPData(inst, arg);
            };
        },
        this.getSubmitData = function( inst ) {
            this.submitData(inst);
        },
        this.submitData = function(inst) {
            var op = inst.options;
            var submit = op.submit;
            var formObj = this.getFormData(inst);
            if (!formObj.verify) {
                $('body').find('#ui-loader-verbose').remove();
                $('body').find('.ui-overlay-a').remove();
                var tx = formObj.text;
                var _html = '<div class="bg_alert" id="bg_alert"></div><div id="dg_alert" class="dg_alert"><span>'+tx+'</span><a href="javascript:void(0);" class="bg_alerta" id="bg_alerta">确 定</a></div>';
                $("body").append(_html);
                var dg_alert_hei = $("#dg_alert").height();
                $("#dg_alert").css("margin-top",-dg_alert_hei/2);
                LAPP.Events.bindEvent($("#bg_alert"), ".bg_alert", "click", function( p ){
                    $(".bg_alert").remove();
                    $(".dg_alert").remove();
                });
                LAPP.Events.bindEvent($("#bg_alerta"), ".bg_alerta", "click", function( p ){
                    $(".bg_alert").remove();
                    $(".dg_alert").remove();
                });
                return;
            }
            var submitObj = formObj.data;
            LAPP.Publisher.publish("setSubmitData", submitObj, inst);
        },
        this.getFormData = function(self) {
            if (!self.edit) {
                return;
            }
            var formId = $("#" + self.options.render);
            var els = formId.find(".formSubmit");
            var submitObj = {};
            var oldObj = null;
            var passVerify = false;
            for (var i = 0; i < els.length; i++) {
                var key = $(els[i]).attr("data-key");
                var value = $(els[i]).attr("data-value");
                var subType = $(els[i]).attr("subType");
                var verify = $(els[i]).attr('verify');
                var elType = $(els[i]).attr('el-type');
                if (elType == "number" || elType == "inputText" || elType == "textarea" || elType == "date") {
                    value = $(els[i]).val();
                }
                if (verify == "empty" && value != null && value != undefined && value != "") {
                    passVerify = true;
                } else if (verify == "number" && typeof value == 'number') {
                    passVerify = true;
                } else if (verify == "text" && typeof value == "string") {
                    passVerify = true;
                } else {
                    passVerify = false;
                }
                if (subType == "array") {
                    var arr = [];
                    var obj = {};
                    var _key = key;
                    obj[_key] = value;
                    if (LAPP.Util.isArray(submitObj[key])) {
                        arr = submitObj[key];
                        arr.push(obj);
                    } else {
                        arr.push(obj);
                    };
                    submitObj[key] = arr;
                } else {
                    submitObj[key] = value;
                }
            }
            var showText = "";
            if (!passVerify) {
                showText = '数据格式不正确！';
            }
            if (LAPP.Util.equal(oldObj, submitObj)) {
                passVerify = false;
                showText = "数据没有修改！";
            }
            oldObj = submitObj;
            return {
                verify: passVerify,
                text: showText,
                data: submitObj
            };
        },
        this.getParamData = function(inst) {
            var obj = this.getFormData(inst);
            if( obj == undefined ) {
                return;
            }
            obj = obj.data;
            var cid = inst.componentId;
            var paramObj = {};
            paramObj[cid] = obj;
            LAPP.Publisher.publish("setParam", {
                id: cid,
                data: paramObj
            }, inst);
        }
    };

    var Model = function( inst ) {
        var ModelData = {};
        this.init = function( inst,data ) {
            ModelData.initData = data;
            inst.view.init( inst,data );
        };
    };
 
    var Form = Klass.define(LAPP.BasicPlug, {
        constructor : function( pointer ) {
            this.$pointer = pointer;
            this.oLeft = null;
            this.tempLength = null;
            this.oLabelWidth = null;
            this.callBackList = new Map();
            this.view = new View( this );
            this.control = new Control( this );
            this.model = new Model( this );
        },
        setOptions: function(options) {
            var self = this;
            var evts = subEvent(self);
            self.registerEvent(evts);
            var defaultOption = {
                editable: true,
                render: 'wrapper3',
                dbData : "detail",
                events: {
                    id: options.id,
                    el: "#" + options.render,
                    evt: {
                        "click .dd_div_r": "pArrowClick",
                        "click .hClick": "hClick",
                        "click .evt-click": "evtClick",
                        "click .switch": "switchFn",
                        // 'touchstart .LAPP_dragBar': 'scrollStartFn',
                        // 'touchmove .LAPP_dragBar': 'scrollMoveFn',
                        // 'touchend .LAPP_dragBar': 'scrollEndFn',
                        "click .switchBtn" : "switchBtnClick"
                    },
                    handle: {
                        // "scrollStartFn:before": function (p) {
                        //     var event = p.ev;
                        //     var evt = event.evt;
                        //     evt.preventDefault();
                        //     self.oLeft = $(p.current).find('.LAPP_scrollBtn').css("left");
                        //     self.oLeft = self.oLeft.substring(0,self.oLeft.length-2);
                        //     $('input.area').val(self.oLeft);
                        // },
                        // 'scrollStartFn': function(p) {
                        // },
                        // 'scrollMoveFn': function(p) {
                        //     var event = p.ev;
                        //     var evt = event.evt;
                        //     evt.preventDefault();
                        //     // var touch = event.touches[0];
                        //     self.oLabelWidth = $(p.current).parent().parent().find('label').width();
                        //     var rNum = $(p.current).find('.LAPP_endValueSpan').text()*1;
                        //     var startX = event.pageX- self.oLeft-self.oLabelWidth;
                        //     if(startX > self.tempLength) {
                        //         startX = self.tempLength;
                        //     }
                        //     if(startX < 0) {
                        //         startX = 0;
                        //     }
                        //     $(p.current).find('.LAPP_scrollBtn').get(0).style.webkitTransform = 'translate(' + startX + 'px)';
                        //     var temp = startX;
                        //     $(p.current).find('span.LAPP_fillSpan').text(Math.floor(startX*rNum/self.tempLength));
                        //     $(p.current).find('.LAPP_fillSpan').width(startX);
                        // },
                        // "scrollEndFn": function(p) {
                        // },
                        // "scrollEndFn:before": function(p) {
                        //     $(p.current).prev('input.LAPP_dragBar').val($(p.current).find('.LAPP_fillSpan').text());
                        // },
                        "switchFn": function(p) {
                            $(p.current).toggleClass('bg-green');
                            if($(p.current).hasClass('bg-green')){
                                $(p.current).find('input').val(1);
                            }else{
                                $(p.current).find('input').val(0);
                            }
                            // $(this).toggleClass('bg-green')
                        },
                        "switchFn:before": function(p) {
                            // var  temp = $(p.current).attr('class').indexOf("switchOn");
                            // if(temp == -1) {
                            //  $(p.current).removeClass('switchOff');
                            //  $(p.current).addClass('switchOn');
                            //  $(p.current).find('em').animate({left: '32px'}, 300);
                            //  $(p.current).find('b').text('有');
                            //  $(p.current).prev('input').val(1);
                            // }else{
                            //  $(p.current).removeClass('switchOn');
                            //  $(p.current).addClass('switchOff');
                            //  $(p.current).find('em').animate({left: '1px'}, 300);
                            //  $(p.current).find('b').text('无');
                            //  $(p.current).prev('input').val(0);
                            // }
                        },
                        "pArrowClick": function(p) {
                            var gId = $(p.current).attr("groupId");
                            self.gId = gId;
                        },
                        "hClick:before": function(p) {
                            if(options.clickCollapse) {
                                var $this = p.current,
                                    e = p.ev.evt;
                                $this.toggleClass('click');
                                $this.parent('dl').children('dd').toggle();
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        },
                        "hClick": function(p) {

                        },
                        "evtClick": function(p) {
                            var $this = p.current;
                            var gId = $this.attr("groupId");
                            self.gId = gId;
                            var id = $this.attr("data-key");
                            var cb = self.callBackList.get(id);
                            cb();
                        },
                        "switchBtnClick" : function(p){
                            var $this = p.current;
                             $this.parent().toggleClass('bg-green');
                 
                        }
                    }
                }
            };
            this.options = $.extend(true, {}, defaultOption, options);
            this.edit = this.options.editable;
            if( options.data  != undefined ) {
                this.setData(options.data);
                this.model.init(this,options.formData||[]);
            }else if(this.dyParam){
                //this.render();
                 this.control.receiveData(this,options.formData||[]);
            }
            LAPP.Publisher.publish("businessWidgetLoaded", self);
        },
        setData : function( data ) {
            var self = this;
            self.data = data;
           // self.control.receiveData(self,data);
        },
        createHtml: function(renderTarget, dataReginal, data, isEdit , html) {
            var dataReginalArr = [],
                self = this;
            var op = self.options;
            var isCollapse = op.isCollapse || false;
            //获取的所有字段
            if (dataReginal != undefined) {
                $.each(dataReginal, function(key, value) {
                    dataReginalArr.push(value);
                });
            };
            var allForm = html;
            if( $('#' + renderTarget).find(".LAPP-businessForm").length == 0 ) {
                allForm = '<div class="LAPP-businessForm">' + allForm + '</div>';
                $('#' + renderTarget).html(allForm);
            }else{
                $('#' + renderTarget).find(".LAPP-businessForm").html(allForm);
            }
            //渲染
            $('#' + renderTarget + ' .LAPP-form-dl:first-child dt').addClass('click');
            $.each($('.LAPP-form-dl'), function(key, value) {
                if ($(value).children('.dl-form-dl-dd').size() != 0) {} else {
                    $(value).children('.dl-form-dl-dd').css({
                        "margin-top": "0px"
                    });
                }
            });
            $(".LAPP-form-dl").each(function(){
                var p_len = $(this).find('dd div p').length;
                $(this).find('dd div p').eq(p_len-1).css('border',"none");
            })
            //进行判断是否可编辑
            if (isEdit) {
                self.editFun();
            }
            //是否全部展开
            if(isCollapse) {
                $('.hClick').addClass('click');
                $('.LAPP-form-dl-dd').show();
            }
            self.tempLength = $('.LAPP_scrollDiv').width();
        },
        render: function(html) {
            var op = this.options,
                renderTarget = op.render, //渲染节点
                self = this,
                data,
                edit = this.edit,
                labelData = op.data,
                formData = op.formData
            // isScroll = op.isScroll
                ;

            if( $('#' + renderTarget).length == 0 ) {
                return;
            }
            if( formData != undefined ) {
                data = formData;
            }
            if( $.isFunction(edit) ) {
                edit = edit(this.dyParam);
                this.edit = edit;
            }
            if( self.data == undefined && !edit ) {
                return;
            }else{
                data = self.data;
            }
            self.createHtml(renderTarget, data, labelData, edit,html);
            if( LAPP.Util.isObject(op.css) ) {
                $('#' + renderTarget).css(op.css);
            }
            if( $.isFunction(op.cb) ) {
                op.cb(data, this);
            }
           // EventCollector.initEvents(op.events);
            LAPP.Publisher.publish("componentLoadedFinished", data, self);
            // LAPP.Publisher.publish("businessWidgetLoaded", self);
        },
        refresh : function( arg ) {
            var self = this;
            if( arg != undefined ){
                self.options = LAPP.Util.extend(this.options, arg);
            }
            self.model.init(self,self.data);
            //this.render();
        },
        setFormFile : function(arg) {
            this.control.setFormFile(this, arg);
        },
        editFun: function() {
            var id = this.options.render;
            var dom = $("#" + id).find('.LAPP-form-dl p span');
            $.each(dom, function(key, value) {
                if( $(value).find(".dd_div_r").length > 0 ) {
                    return;
                }
                var tempValue = $(value).text();
                var evtType = $(value).attr('evt-type');
                var evtClass = '';
                var dataKey = $(value).attr('data-key');
                var dataValue = $(value).attr('data-value');
                var groupId = $(value).attr('groupId');
                var orderId = $(value).attr('orderId');
                var subType = $(value).attr("subType");
                var verify = $(value).attr("verify");
                if ($(value).hasClass("formSubmit")) {
                    evtClass = "formSubmit ";
                }
                if (evtType != undefined) {
                    evtClass += evtType;
                };
                evtClass += " " + groupId;
                var elType = $(value).attr('el-type');
                if (elType != "text") {
                    $(value).removeAttr("evt-type");
                    $(value).removeAttr(evtType);
                    $(value).removeAttr('data-key');
                    $(value).removeAttr('data-value');
                    $(value).removeAttr('groupId');
                    $(value).removeAttr("subType");
                    $(value).removeAttr("verify");
                    $(value).removeClass("formSubmit");
                    $(value).removeClass("dd_div_r");
                    $(value).removeClass("orderId");
                    if (groupId != "" && groupId != null) {
                        $(value).removeClass(groupId);
                    }
                    var args = {
                        "tempValue": tempValue,
                        "evtType": evtType,
                        "evtClass": evtClass,
                        "dataKey": dataKey,
                        "dataValue": dataValue,
                        "groupId": groupId,
                        "orderId": orderId,
                        "subType": subType,
                        "verify": verify,
                        "elType": elType
                    };
                    $(value).html(LAPP.widgetHub.fac(elType, args));
                }
                if (elType != "select" && elType != "text") {
                    if (elType == "textarea") {
                        $(value).find("textarea").removeAttr("data-value");
                    } else {
                        $(value).find("input").removeAttr("data-value");
                    }
                }

            });
            $.each($('.LAPP-form-dl dd p span').children('.divSelect'), function(key, value) {
                $(this).parent('span').parent('p').addClass('pArrow');
            });

            $.each($('.switchBtn'), function (key, value) {
                if($(value).attr("value")==1){
                    $(value).parent().addClass('bg-green');
                    $(value).val(1);
                }
                // if ($(value).attr("value") == 1) {
                //  $(value).parent().find('.switchBtnArea').find('em').animate({left: '32px'}, 300);
                //  $(value).parent().find('.switchBtnArea').find('b').text('有');
                //  $(value).parent().find('.switchBtnArea').prev('input').val(1);
                //  $(value).parent().find('.switchBtnArea').removeClass("switchOff").addClass("switchOn");
                // }
            });
            $.each($('.LAPP_scrollDiv'), function (key, value) {
                var t = $(value).find('.LAPP_fillSpan').attr('default_value'),
                    e = $(value).parent().find('.LAPP_endValueSpan').text()*1,
                    w = ($(window).width() - 100)*0.7;
                $(value).find('.LAPP_scrollBtn').get(0).style.webkitTransform = 'translate(' + (t*1/e*w) + 'px)';
                $(value).find('span.LAPP_fillSpan').text(Math.floor(t));

                var rNum = $(value).parent().find('.LAPP_endValueSpan').text()*1;
                $(value).find('.LAPP_fillSpan').width((t)/e*w);
            })
        },
        add: function(arg) {
            var op = this.options,
                opData = op.data,
                mainId = arg.mainId,
                data = arg.data,
                flg = true;

            // opData.push(data);
            var htm = this.view.createHtml(this.data, [data], this, op);
            $('#' + op.render).append(allForm);
            $('#' + op.render + ' .LAPP-form-dl:first-child dt').addClass('click');
            $.each($('.LAPP-form-dl'), function(key, value) {
                if ($(value).children('.dl-form-dl-dd').size() != 0) {} else {
                    $(value).children('.dl-form-dl-dd').css({
                        "margin-top": "0px"
                    });
                }
            });
            //进行判断是否可编辑
            if (this.edit) {
                this.editFun();
            }
            EventCollector.initEvents(op.events);
            $('.hClick').addClass('click');
            $('.LAPP-form-dl-dd').show();
            // this.refresh(op);
        },
        remove: function(arg) {
            var op = this.options,
                opData = op.data,
                mainId = "#form_"+arg.mainId,
                render = op.render
                ;
            $("#"+render).find(mainId).remove();
            // this.refresh();
        },
        empty: function() {
            var dom = $("#" + this.options.render).find(".dd_div_r");
            for (var i = 0; i < dom.length; i++) {
                $(dom[i]).text("");
                $(dom[i]).attr("data-value", "");
                $(dom[i]).val("");
            }
        }
    });
   // Form.fieldMaker = function () {};
    LAPP.Form = Form;
}());
