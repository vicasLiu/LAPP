/**
 * Created by Burk on 2015/3/5.
 */

$(function(){

    var page = new LAPP.Page();

    page.config({
        base: "../../../../app/",
        jsbase: "../../../",
        cssbase: "../../../"
    });

    page.Ready(function(loginInfo){
        var data1 = {
            type: "",
            to: "",
            url: "",
            service: ""
        };

        var listOp = {
            DataCP: {
                show: true,
                id: "dataCp1",
                subId: ["list1"],
                paging : {},
                dataParam : {},
                common : {
                    url : "page01.json"
                }
            },
            Layout: {
                show: true,
                render: "body",
                id: "layout1",
                ele: [
                    {"LAPP-header": {top: 0, height: 50, show : true, animation : "slide"}},
                    {"listPage": {top: 60, height: "auto", show: true, animation : "slide"}},
                    {"formPage": {top: 60, height: "auto", show: true, animation : "slide"}},
                    {"groupingPage": {top: 60, height: "auto", show: true, animation : "slide"}}
                ]
            },
            Toolbar: {
                show: true,
                render: "LAPP-header",
                id: "toolbar1",
                ele: [
                    {type: 'title',text: '',show: true},
                    {type: 'back', text: '', show: true, status: ["page01", "page02", "page03"]},
                    {type: 'submit', text: '下一步', show: true, status: ["page01"]}
                    ,
                    {type: 'nextTo3', text: '下一步', show: true, status: ["page02"]}
                ],
                events : {
                    evt :{
                        "click .back" : "backClick",
                        "click .submit" : "nextPage",
                        "click .nextTo3" : "nextPage03"
                    },
                    handle : {
                        backClick : function(){
                            page.back();
                        },
                        nextPage : function(){
                            page.setOptions(formOp, "formOp", "基本信息", "page02");
                        },
                        nextPage03 : function(){
                            page.setOptions(groupingOp, "groupingOp", "设置活动时间", "page03");
                        }
                    }
                }
            },
            iScroll : {
                show : true,
                render : "listPage",
                id : "iScroll1",
                subId: ['list1']
            },
            List: {
                show: true,
                id: 'list1',
                liHeight: 90,
                subId : ["dataCp1"],
                render: "listPage",
                isLink: true,
                isEdit: false,
                isSelected: false,
                isMultiple: false,
                widgetType:"singlelist",
                dbData : "data",
                divPosition:[
                    {left: "36px", top: "0px", fn: function(data){
                        return '<img src="' + data["imgSrc"] + '">';
                    }},
                    {left: "100px", top: "-20px", dataFile: "TITLE"},
                    {left: "100px", top: "0px", fn: function(data){
                        var text = "电话: "+ data["PHONE"];
                        return text;
                    }},
                    {left: "100px", top: "20px", fn: function(data){
                        var text = "地址: " + data["ADD"];
                        return text;
                    }}
                ]
            }
        };

        var formOp = {
            DataCP: {
                show: true,
                id: "dataCp2",
                subId: ["form1"],
                paging : {},
                dataParam : {},
                common : {
                    url : "page02.json"
                }
            },
            iScroll : {
                show : true,
                render : "formPage",
                id : "iScroll2",
                subId: ['form1']
            },
            Form: {
                show: true,
                render: 'formPage',
                id : "form1",
                subId: ["dataCp2"],
                isHideTitle: [false,false,false],
                edit : 'allEditors',// 可以编辑全部(allEditors) 部分能编辑(partEditors) 全部不能编辑(notEdit)
                dbData: "data",
                data : [ {
                    title : {key:'',value:''},
                    isTogglepanel : false,  // 是否可以切换
                    data : [
                        {id:"menDian",label:'门店',labelCls:'',field:'shopName',type:'select',edit:false, value: ""},
                        {id:"hdzt",label:'活动主题*',labelCls:'',field:'hdzt',type:'inputText',value: '活动主题',edit:true},
                        {id:"yjjdl",label:'预计接单量*',labelCls:'',field:'yjjdl',type:'inputText',value: '预计接单',edit:true}
                    ]
                }],
                events : {
                    evt : {
                        "click #hdzt": "hdztClick"
                    },
                    handle : {
                        hdztClick: function(){
                            $(this).val();
                        }
                    }
                }
            }
        };

        var groupingOp = {
            DataCP: {
                show: true,
                id: "dataCp3",
                subId: ["grouping1"],
                paging : {},
                dataParam : {},
                common : {
                    url : "page03.json"
                }
            },
            iScroll : {
                show : true,
                render : "groupingPage",
                id : "iScroll3",
                subId: ['grouping1']
            },
            Grouping: {
                show: true,
                id: 'grouping1',
                liHeight: 45,
                subId : ["dataCp3"],
                render: "groupingPage",
                dbData : "formData",
                data : {
                    title : {key:'title1',value:'标题1'},
                    data : [
                        {field : 'textlabel'},     // 第一个是设置label
                        {field : 'textRight'}
                    ]
                }
            }
        };

        page.setData(data1);
        page.setOptions(listOp, "listOp", "选择门店", "page01");
    });
});