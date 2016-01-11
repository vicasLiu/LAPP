/**
 * Created by Burk on 2015/3/5.
 */

$(function(){
    var page = new LAPP.Page;

    page.config({
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
                subId: ["list1", "tab1"],
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
                    {"tabPage": {top: 48, height: 48, show: true, animation : "slide"}},
                    {"listPage": {top: 105, height: "auto", show: true, animation : "slide"}},
                    {"attachPage1": {top: 60, height: "auto", show: true, animation : "slide"}},
                    {"attachPage2": {top: 165, height: "auto", show: true, animation : "slide"}},
                    {"attachPage3": {top: 270, height: "auto", show: true, animation : "slide"}}
                ]
            },
            Toolbar: {
                show: true,
                render: "LAPP-header",
                id: "toolbar1",
                ele: [
                    {type: 'title',text: '',show: true},
                    {type: 'back', text: '返回', show: true, status: ["page01", "page02"]},
                    {type: 'search', text: '', show: true, status: ["page01"]}
                ],
                events : {
                    evt :{
                        "click .back" : "backClick",
                        "click .search" : "searchClick"
                    },
                    handle : {
                        backClick : function(){
                            page.back();
                        },
                        searchClick : function(){
                            alert("1");
                        }
                    }
                }
            },
            Tab: {
                show: true,
                id: 'tab1',
                height : '40px',
                render: 'tabPage',
                subId:["list11","dataCp1"],
                ele: [
                    {key:"",value:"阶段一确认列表",status:false},
                    {key:"",value:"阶段二列表",status:false}
                ],
                clickFn: function (data) {
                    if(status == "阶段一确认列表"){
                        page.refresh("dataCp1");
                    }else if(status == "阶段二列表"){
                        page.refresh("dataCp1");
                    }
                    page.refresh("list1", listOp.List);
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
                liHeight: 65,
                subId : ["dataCp1", "tab1"],
                render: "listPage",
                isLink: true,
                isEdit: false,
                isSelected: false,
                isMultiple: false,
                widgetType:"list",
                dbData : "data",
                divPosition:[
                    {left: "10px", top: "-10px", dataFile : "NUMBER"},
                    {left: "150px", top: "-10px", dataFile: "STATUS"},
                    {left: "10px", top: "15px", dataFile : "NAME"},
                    {left: "150px", top: "15px", fn:function(data){
                        var text = "交底日期: " + data["LIMIT_DATE"];
                        return text;
                    }}
                ]
                ,
                cb : function(data){
                    console.log(data);
                },
                events:{
                    evt:{"click .LAPP-list-li":"liclick"},
                    handle : {
                        liclick : function(p){
                            var _this = $(p.current);
                            page.setOptions(attachOp,"attachOp", "列表详情", "page02")
                        }
                    }

                },
                cb:function(data){
                    console.log(data);
                },
                clickFn : function(data){
                    console.log(data);
                }
            }
        };

        var attachOp = {
            Attach: [
                {
                    show: true,
                    id: "attach11",
                    //subId: ["datacp1"],
                    render: "attachPage1",
                    editable: true,
                    isIscroll: true,
                    number: 3,
                    //dbData: "data",
                    data: [
                        {
                            filePath : "QQ图片20150304101933.jpg",
                            data : "",
                            type : "image"      // 图片
                        }
                    ],
                    events : {
                        el : "#attach1",
                        evt : {
                            "click .icon-add" : "add"
                        },
                        handle : {
                            add : function( p ) {
                                //alert(p.current.text());
                                alert("添加附件");
                            }
                        }
                    }
                },{
                    show: true,
                    id: "attach12",
                    //subId: ["datacp1"],
                    render: "attachPage2",
                    editable: true,
                    isIscroll: true,
                    number: 3,
                    //dbData: "data",
                    data: [
                        {
                            filePath : "QQ图片20150304101933.jpg",
                            data : "",
                            type : "image"      // 图片
                        }
                    ],
                    events : {
                        el: "#attach1",
                        evt: {
                            "click .icon-add": "add"
                        },
                        handle: {
                            add: function (p) {
                                //alert(p.current.text());
                                alert("添加附件");
                            }
                        }
                    }
                },{
                    show: true,
                    id: "attach13",
                    //subId: ["datacp1"],
                    render: "attachPage3",
                    editable: true,
                    isIscroll: true,
                    number: 3,
                    //dbData: "data",
                    data: [
                        {
                            filePath : "QQ图片20150304101933.jpg",
                            data : "",
                            type : "image"      // 图片
                        }
                    ],
                    events : {
                        el: "#attach1",
                        evt: {
                            "click .icon-add": "add"
                        },
                        handle: {
                            add: function (p) {
                                //alert(p.current.text());
                                alert("添加附件");
                            }
                        }
                    }
                }
            ]
        };

        page.setOptions(listOp, "listOp", "技术交底一", "page01");
    });
});