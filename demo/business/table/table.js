$(function(){
    var page = new LAPP.Page();
    page.config({
        base : '../../../../APP/',
        jsbase : '../../../',
        cssbase : '../../../'
    });
    page.Ready(function( loginInfo ){
        var data = {
            type : "rest",
            to : "EBS",
            url : "table.json",
            service : "XEAM_INT_PKG"
        };
        var op = {
            DataCP : {
                show : true,
                id : "listDataCp",
                subId : ["table"],
                paging : {
                    "index" : "P_PAGE",
                    "count" : "P_PAGE_CNT"
                },
                dataParam : {
                    "dataFun" : "P_TRANSFER_LIST",
                    "P_USER_NAME" : page.getLoginName(),
                    "P_PAGE" : "1",
                    "P_PAGE_CNT" : "30"
                }
            },
            Layout : {
                show : true,
                render: "body",
                id : "layout1",
                ele:[
                      {"LAPP-header":{top: 0,height:50, show : true, animation : "slide"}},  
                      {"table-page":{top: 91,height: 'auto', show : true, animation : "slide"}}
                      
                ]
            },
            Toolbar: {
                show: true,
                render: "LAPP-header",
                id : "toolbar",
                ele:[
                    {type:'title',text: 'Table',show: true},
                    {type: 'back', text: '返回',show: true}
                ]   
            },
            iScroll : {
                show : true,
                render : "table-page",
                id : "iScroll",
                subId: ['table'] 
            },
            Table: {
                show: true,
                id: 'table',
                render: 'table-page',
                dbData : "formData",
                subId : ["listDataCp","iScroll"],
                data: {
                    // tPercent : ["40%","35%","25%"],
                    // tHead : [
                    //     {label:'最佳客户',field:'xx21'}
                    // ],
                    tBody : [
                        {label : '姓名' , field : 'name'},
                        {label : '年龄' , field : 'age'},
                        {label : '百分比' , field : 'number'}
                    ],
                    tFooter: [
                        {label: '总计',field : 'gaga'}
                    ]
                 }//,
                // formData : {
                //     // tHead : [
                //     //     {xx:'详情1'},
                //     //     {xx:'详情2'}
                //     // ],
                //     tBody : [
                //         {name:'李四',age:'35',number:'30.00%'},
                //         {name:'黎明',age:'30',number:'10.00%'},
                //         {name:'吴王',age:'33',number:'30.00%'}
                //     ],
                //     tFooter : [
                //         {gaga : '1400万元'}
                //     ]  
                // }
                
            }
        };
     
        page.setData(data);
        page.setOptions(op, "LIST", "Table", "list");
    });
});