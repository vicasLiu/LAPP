/**
 * @File 搜索组件
 * @Import
 * @CreatedBy LAPP Mobile Components Development Group
 * @GroupMember Guo yonglong
 * @Email 
 * @Module LAPP
 * @Date 2014-03-26
 */
"use strict";
if(!LAPP){
	var LAPP = {};
};
(function(){
	function Search (pointer) {
		this.$pointer = pointer;
	}
	Search.prototype = {
		constructor: Search,
		init: function (options, id) {
			if( id != undefined ) {
				this.$pointer = id;
			}
			this.setOptions(options);
		},
		getSubId : function() {
			return this.$pointer;
		},
		getActive : function() {
			return this.$active;
		},
		setActive : function( flg ) {
			this.$active = flg+"";
		},
		setOptions: function( options ) {
			this.options = options;
			var renderTarget = options.render || 'wrapper',//渲染节点
             	ele = options.ele;

            this.options["countTips"] = this.options["countTips"] || "{{count}} 个结果";
            this.options["onSearch"] = this.options["onSearch"] || function () {};
            this.options["onClear"] = this.options["onClear"] || function () {};

            // 构造列表视图方法
			if (options.template) {
				this.buildItem = function (dataItem) {
					return options.template.replace(/\{\{(\w+)\}\}/g, function (m, m1) {
						return dataItem[m1];
					});
				};
			} else if (options.showKey) {
				this.buildItem = function (dataItem) {
					return '<li><a href="javascript:;">'+ dataItem[options.showKey] +'</a></li>';
				};
			} else {
				throw new Error('Search Components: template or showKey is null');
				return false;
			}
			
			//加载Dom
			this.createHtml(renderTarget,ele);
			//
			this.fn();
			//
			//this.loadScroll(renderTarget);  
		},
		createHtml: function (renderTarget) {
			var options = this.options;
			var $render = $('#'+renderTarget);
			var tempDiv = [
				'<div class="search">',
					'<div class="searchIpt"><input class="icon-magnifier" placeholder="'+ options.placeholder +'" style="width: '+ options.placeholderWidth +'" /><span></span><a href="javascript:;" class="text-close">取消</a><a href="javascript:;" class="icon-recording"></a></div>',
				'</div>'
			];
			var $searchList = $('<div id="searchList" class="searchList"><ul></ul></div>');
			$render.html(tempDiv.join(""));

			// 设置宽高, 若不传递，则自动计算
			if (options.listOffset) {
				$searchList.css(options.listOffset);
			} else {
				$searchList.css("top", parseInt($render.css("top")) + parseInt($render.css("height")))
			}
			
			$render.after($searchList);

			// 添加滚动条
			//this.loadScroll("searchList");
		},
		fn: function(){
			var that = this
				, timeout
				, $searchIpt = $('div.searchIpt')
				, $input = $searchIpt.find("input")
				, $countTips = $searchIpt.find("span")
				, $delBtn = $(".text-close")
				, $searchList = $('#searchList')
				, searchData = null
				, data = this.options.data
				;

			$searchIpt.on("click", function(ev) {
				$searchList.show();
				searchData = JSON.parse(localStorage.getItem("historySearchData"));
				$input.trigger("focusin").focus();
			});

			$input.on('click', function () {
				return false;
			}).on('focus', function () {
				$searchIpt.addClass("active");
				if( LAPP.Util.isArray(searchData) ) {
					var htm = "";
					for(var k = 0; k < searchData.length; ++k){
						htm += '<li><a href="javascript:;">'+ searchData[k] +'</a></li>';	
					}
					$searchList.find("ul").html(htm);
				}
			}).on('blur', function () {
				if ($.trim(this.value) === "") {
					$searchIpt.removeClass("active");
					$searchList.hide();
				}
			}).on('input', function () {
				var value = $.trim(this.value);
				clearTimeout(timeout);
				timeout = setTimeout(function () {
					$searchList.show();
					that.filter(value, $searchList);
					$countTips.text("");
				}, 100);
			});

			// 清空输入内容
			$delBtn.on('click', function () {
				$countTips.text("");
				$input.val("").trigger("blur").trigger("keyup");
				that.options.onClear();
			});

			// 选择列表，进行补全
			$searchList.on('click', 'li a', function () {
				var keyword = $.trim($(this).text());
				if(searchData == null) {
					searchData = [];
					searchData.push(keyword);
				}else{
					searchData.push(keyword);
				}
				localStorage.setItem("historySearchData", JSON.stringify(searchData));
				$input.val(keyword).focus();
				$searchList.hide();
				var returnData = [];
				if (data && data.length) {
					for (var i = 0, l = data.length; i < l; i +=1) {
						var item = data[i];
						if (that.filterMatch(item, keyword)) {
							returnData.push(item);
						}
					}
				}
				that.options.onSearch(keyword, returnData, function (count) {
					$countTips.text(that.options.countTips.replace(/\{\{count\}\}/, count));
				});
			});
		},
		filter: function(keyword, $searchList) {
			var options = this.options
				//, data = options.data
				, data = JSON.parse(localStorage.getItem("historySearchData"))
				, i, l, item
				, html = []
				;
			
			if ( LAPP.Util.isArray( data ) ) {
				//for (i = 0, l = data.length; i < l; i +=1) {
					//item = data[i];
				var newArray = [];
				var matcher = new RegExp( keyword.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i" );
				$.grep( data, function(value) {
					if(matcher.test(value )){
						newArray.push(value);
					}
				});
				var htm = "";
				if( keyword  == "" ) {
					newArray = data;
					for( var i = 0; i < newArray.length; i++ ) {
						htm += '<li><a href="javascript:;">'+newArray[i]+'</a></li>';
					}
				}else if( newArray.length == 0 ) {
					htm += '<li><a href="javascript:;">'+keyword+'</a></li>';
				}else{
					for( var i = 0; i < newArray.length; i++ ) {
						htm += '<li><a href="javascript:;">'+newArray[i]+'</a></li>';
					}
				}
				//}
				$searchList.find("ul").html(htm);
				this.myScroll.refresh();	// 视图高度改变，刷新滚动条
			}else{
				$searchList.find("ul").html('<li><a href="javascript:;">'+keyword+'</a></li>');
			}
		},
		filterMatch: function (data, keyword) {
			var filterKey = this.options.filterKey
				, filterKey = $.isArray(filterKey) ? filterKey : [filterKey]
				, i, l, item
				;

			for (i = 0, l = filterKey.length; i < l; i += 1) {
				item = filterKey[i];
				if ((data[item]+"").toLowerCase().indexOf(keyword) !== -1) {
					return true;
				}
			}
			return false;
		},
		loadScroll: function(render) {
			this.myScroll && this.myScroll.destroy();	// 先去掉之前的滚动条
			this.myScroll = new iScroll(render,{
				checkDOMChanges:true, 
				hScrollbar:true, 
				vScrollbar:true,
				vScroll: true,
				useTransition : true,
				onRefresh : function() {

				},
				onScrollMove: function () {
					
				},
				onScrollEnd: function () {

				}
			});
			$('#'+ render +' ul').css({"transform": "translate3d(0px, 0px, 0px) scale(1)"});	
		}

	};

	LAPP.Search = Search;
})();