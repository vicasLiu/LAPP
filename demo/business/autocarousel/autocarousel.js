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
									{"LAPP-header":{top: 0,height:50, show : true, animation : "slide"}},
									{locationListPage:{top: 51,height: 'auto', show : true}}
								]
				},
				Toolbar: {
					show: true,
					render: "LAPP-header",
					id : "toolbar",
					ele:[
						{type:'title', text: 'Carousel',show: true},
						{type: 'btn', text: '返回',show: true}
						]
				},
				Carousel: {
					show:  true,
					render: 'locationListPage',
					autoPlay : true,
					id: 'carousel',
					data : [  
						{href:'',imgUrl : "carousel.jpg",cls:"img1"},
        				{href:'',imgUrl : "carousel.jpg",cls:"img2"},
        				{href:'',imgUrl : "carousel.jpg",cls:"img3"}
        			],
        			events : {
						el : "#carousel",
						evt : {
							"click .img1" : "imgClick"
						},
						handle : {
							imgClick : function( p ) {
								var imglist = p.current;
								console.log(1)
							}
						}
					}
				}
		};
		page.setOptions(op, "LIST", "Form", "list");
	});
});
