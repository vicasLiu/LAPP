$(function(){
	var page = new LAPP.Page();
	page.config({
        base : '../../../../APP/',
		jsbase : '../../../',
        cssbase : '../../../'
	});
	page.Ready(function( loginInfo ){
		var op = {
			Layout : {
				show : true,
    			render: "body",
                id : "layout1",
                ele:[
                      {mapPage:{top: 0,height:44,show: true}},
                      {locationListPage:{top: 96,height: 'auto', show : true}}
                ]
			},
			Search : {
				show: true,
                type: 'textType',
                render: "mapPage",
                id: "search",
                placeholder: "搜索",
                placeholderWidth: "30px",
                listOffset: {top: "52px", bottom: "60px", height: $(window).height() - 125, "z-index": 111111},
                filterKey: "name",
                showKey: "name",
                onClear: function () {
                    $("#searchWrapper").empty();
                },
                onSearch: function (keyword, data, setCount) {
                    alert(1);
                }
			}
		};
		page.setOptions(op, "search", "search", "search");
	});
});