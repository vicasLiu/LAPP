$(function(){
    var page = new LAPP.Page();
    page.config({
        jsbase : '../../../',
        cssbase : '../../../' 
    });
    page.Ready(function( loginInfo ){
        var data = {
            type : "rest",
            to : "EBS",
            url : "demo.json",
            service : ""
        };
        var op = {
            DataCP : {
                show : true,
                id : "listDataCp",
                subId : "list1",
                dataParam : {
                    
                }
            },
            Layout : {
                show : true,
                render: "body",
                id : "layout1",
                ele:[
                      {"LAPP-header":{top: 0,height:50, show : true, animation : "slide"}},  
                      {"timepick-page":{top: 51,height: 'auto', show : true, animation : "slide"}}
                ]
            },
            Toolbar: {
                show: true,
                render: "LAPP-header",
                id : "toolbar",
                ele:[
                     {type:'title',text: 'Timepick',show: true} 
                    ]   
            },
            Timepick: [{ 
                show: true,
                id: 'timepick',
                render: "timepick-page",
                // ele: {
                //     date : "2015-7-8", // 必须转换成为24时进制
                //     time : [3,5,6,8,15,20]
                // },
                subId : "listDataCp",
                adpter : function( data ) {
                    var ele = {
                        date : "2015-7-8",
                        time : [3,5,6,8]
                    };
                    return ele;
                },
                events : {              
                    evt: {
                        'click li': "clickFn"
                    },
                    handle: {
                        "clickFn": function (p) {
                             //alert(1);
                            //self.timeClick(p.current);
                        }
                    }
                }
                
            }]
        };
     
        page.setData(data);
        page.setOptions(op, "LIST", "Timepick", "list");
    });
});