/**
 * @File attach 附件组件
 * @Import
 * @CreatedBy LAPP Mobile Components Development Group
 * @Module LAPP
 * @Date 2014-01-20
 */
(function(){
	var _myScroll = '';
	/*
		subEvent
	*/
	var subEvent = function(inst) {
		var evts = new Map()
			, control = inst.control
			, me = inst;

		evts.put('attachFinish', function (arg) {
			me.uploadAttach( arg );
		}, me);
		evts.put('downLoadFinish', function (arg) {
			me.uploadAttach( arg );
		}, me);
		evts.put('buttonClick', function (arg) {
			me.openCamera( arg );
		}, me);
		evts.put('publishParam', function (data) {
			me.control.receiveParam(me, data);
		}, me);
		evts.put('submitData', function () {
			me.control.submitData(me);
		}, me);
		evts.put('dataFinish', function (data) {
			me.control.handleFinished(me,data);
		}, me);
		return evts;
	};
	var getData = function( arg, callback ) {
		var dc = new DataCenter();
		dc.ajax({
			"data" : arg['dataParam'],
			"callback" : function( data ) {
				var retData = data.listdata1;
				if(arg.dbData != undefined){
					retData = data[arg.dbData];
				}
				callback(retData);
			}
		});
	};
	// 重新计算iscroll和小点数量
    var _attach_fn = function(number, _parent, id){
    	var _index = _parent.parent().find(".LAPP-component-attach-dot a").eq(".active");
    	console.info(_index);
        var _L = number || 4,i = 0,
            _len = _parent.find('a').length,
            _parseInt_len =  parseInt(_len/_L),
            _newlen = _len%_L ? _parseInt_len + 1 : _parseInt_len,
            win_wid = $(window).width(),
            _wid = win_wid*_newlen,_html = '';
        _parent.width(_wid); // 重新设置宽度
        if( _newlen == _index){
            _index--;
        }
        for( ; i < _newlen ; i++ ){
            _html += '<a href="javascript:void(0)" ' + ( (i==_index) ? 'class="active"' : '' ) + '></a>';
        }
        $('#' + id + ' .LAPP-component-attach-dot').html(_html); // 重新加载小点
        // _myScroll.refresh(); // 刷新
    }
	var packImgD = function( o, edit ) {
		/*
		 * filePath : filePath,
			fileData : fileData,
			fileName : fileName
		 */
		var imgArr = [];
		var arr = [];
		var k = 0;
		if( edit ) {
			arr.push({
				src : "",
				desc : "",
				data : "",
				flg : "",
				type : "edit"
			});
			k++;
		}
		if( edit && (o == undefined || o.length == 0 )){
			imgArr.push(arr);
		}else if( o.length == 0 && !edit ) {
			arr.push({
				src : "../public/images/sys/noAttach.png",
				desc : "",
				data : "",
				flg : "default",
				type : "image/pjpeg"
			});
			imgArr.push(arr);
			return imgArr;
		}
		if( o != undefined ) {
			var k = (arr.length + 1);
			for( var i = 0; i < o.length; i++, k++ ) {
				arr.push({
					src : o[i].filePath,
					desc : "",
					data : o[i].fileData,
					type : o[i].type
				});
				if( k == 3 ){
					imgArr.push(arr);
					arr = [];
					k = 0;
				}else if( i == o.length - 1) {
					imgArr.push(arr);
				}
			}
		}
		return imgArr;
	};
    /*
     * View
     */
    var View = function (inst) {
    	this.init = function( data ) {
    		seajs.use("core/widget/component/attach/attach.js",function(){
            	LAPP.Component.Attach({op:inst.options,componentData:data,callback:function(html, instiSroll){
            		inst.render(html, instiSroll);
            	}});
        	});
    	};
    	this.add = function( data ) {
    		var id = inst.options.render, number = inst.options.number;
    		var _this = $('#' + id + ' .icon-add'),
                _parent = _this.parents('.LAPP-component-attach-pic'),
                margin_left = $('.icon-add').attr('style'),
                _html ='<a href="#" class="icon-video" style="'+margin_left+'"><em class="remove remove-attach"></em></a>';
            _parent.append(_html);
            _attach_fn(number, _parent, id);
            inst.instiSroll.refresh();
    	};
    };
	var downLoadAttach = function( data, callback ) {
		var len = data.length, index = 0;
		if( len == 0 ) {
			callback([]);
		}
		var dc = new DataCenter();
		for( var i = 0; i < data.length; i++ ) {
			var temp = data[i];
			dc.ajax({
				dtype : "file",
    			ftype : "downLoad",
    			fileType : temp.FILE_TYPE,
				data : {
					"id" : temp.FILE_ID
				},
				callback : function( data ) { //
					if( data == null ) {
						return;
					}
					index++;
					if( index == len ){
						//alert('附件下载完毕！');
					}
				}
			});
		}
	};
	var Control = function (inst) {
		this.handleFinished = function( inst, data ) {
			//this.handleDParam( inst, data );
			inst.setData(data);
		};
		this.handleDParam = function( inst, arg ) {
			var op = inst.options, dbData = op.dbData;
			if( dbData == undefined ) {
				dbData = "listdata1";
			}
			if( arg == undefined || arg[dbData] == undefined ){
				inst.render();
			}else{
				if($.isFunction(op.adpter)) {
					retData = op.adpter(arg[dbData]);
					inst.render( retData );
				}else{
					downLoadAttach(arg[dbData], function( retData ) {
						inst.render( retData );
					});
				}
			};
		};
		this.receiveParam = function( inst, arg ) {
			inst.dyParam = arg;
		};
		this.submitData = function( inst ) {
			if(!inst.edit){
				return;
			}
			var op = inst.options;
			var data = inst.data;
			LAPP.Publisher.publish("setAttachData", data, inst);
			//upLoadAttach( inst.attachArray, op.submit, id );
		};
		this.add = function( data ) {
			inst.model.add(data);
		};
	};
	/*
     * Model
     */
    var Model = function (inst) {
        this.init = function (data) {
        	var o = data;
			var op = inst.options;
			var render = inst.options.render;
			var edit = inst.edit;
			if( op.dbData != undefined ) {
				o = o[op.dbData];
			}
			if( o == undefined && !edit){
				o = [];
			};
			if( $.isFunction( op.adpter ) ) {
				o = op.adpter(o);
			}
			inst.data = o;
            inst.view.init(o);
        };
        this.add = function( data ) {
        	var adata = inst.data;
        	adata.push(data);
        	inst.view.add(data);
        }
    };

	var Attach = Klass.define(LAPP.BasicPlug, {
		constructor : function( pointer ) {
			this.isDataReady = false;
			this.$pointer = pointer;
            this.view = new View(this);
            this.control = new Control(this);
            this.model = new Model(this);
		},
		setData : function( data ) {
			// this.data = data;
			this.isDataReady = true;
			this.model.init(data);
			//createHtml(this,data);
		},
		setOptions : function( options ) {
			var self = this;
            var evts = subEvent(self);
            self.registerEvent(evts);
			var defaultOp = {
				events : {
					id : options.id,
					el : "#"+options.render,
					evt : {
						"click .icon-add" : "addAttach",
						"click .remove-attach" : "removeAttach"
					},
					handle : {
						"addAttach" : function() {
							LAPP.Publisher.publish("triggleButton", self);
						},
						"removeAttach:before" : function(p) {
							var $this = p.current;
							var _parent = $this.parents('div.LAPP-component-attach-pic');
		                    $this.parent().remove();
		                    _attach_fn(_parent);
		                 	self.instiSroll.refresh();
						},
						"removeAttach" : function() {

						},
						"attachClick" : function( p ) {
							var $this = p.current;
							var clickType = $this.attr("evt-click");
							if( clickType == "delete" ){
								self.delImgD($this.attr('imgId'));
							}else if( clickType == "open" ){
								self.showPIC($this);
							}else{

							}
						}
					}
				}
			};
			self.options = $.extend( true, {}, defaultOp, options);
			style = options.styleSheet;
			self.edit = self.options.editable;
			if( options.data != undefined ) {
			 	self.setData(options.data);
			}
			LAPP.Publisher.publish("businessWidgetLoaded", self);
		},
		render : function(html, iScroll_) {
			//if( !(!this.edit && this.isDataReady) ){
				//return;
			//}
			var o = this.data;
			var op = this.options;
			var render = this.options.render;
			var edit = this.edit;
			if( op.dbData != undefined ) {
				o = o[op.dbData];
			}
			if( o == undefined && !edit){
				o = [];
			};
			if( $.isFunction( op.adpter ) ) {
				o = op.adpter(o);
			}
			var obj = o;
			obj = packImgD(obj, edit);
			$("#"+render).html(html);
			// if(op.isIscroll){
			// 	if(!_myScroll) {
			// 		_myScroll = new iScroll($('.LAPP-component-attach')[0], {
			// 			checkDOMChanges:true,
			// 			snap: true,
			// 			momentum: false,
			// 			hScrollbar: false,
			// 			vScroll : false,
			// 			onScrollEnd: function () {
			// 				document.querySelector('#indicator1 > li.active').className = '';
			// 				document.querySelector('#indicator1 > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
			// 			}
			// 		 });
			// 	} else {
			// 		_myScroll.refresh();
			// 	}
			// }
			this.instiSroll = iScroll_;
			EventCollector.initEvents(op.events);
			LAPP.Publisher.publish("componentLoadedFinished", obj, this);

			if( $.isFunction( op.cb ) ) {
				op.cb(o);
			}
		},
		showPIC : function( obj ) {
			var src = obj.attr("attachPath");
			var type = obj.attr("type");
			if(src == "undefined" || src == ""){

			}else{
				if(type == "image/pjpeg") {//照相图片
					LAPP.NativeAPI.openPhoto(src);
					//document.location.href = 'http://test.kingnode.com/portal/eam/openPhoto('+src+')';
				} else if(type == "video/quicktime") {//视频
					LAPP.NativeAPI.openVideo(src);
					//document.location.href = 'http://test.kingnode.com/portal/eam/openVideo('+src+')';
				} else if(type == "application/octet-stream") {//录音
					LAPP.NativeAPI.openRecord(src);
					//document.location.href = 'http://test.kingnode.com/portal/eam/openRecord('+src+')';
				}
			}
		},
		uploadAttach : function( arg ) {
			var self = this;
			LAPP.Publisher.publish("triggleButton", "hide", self);
			this.control.add(arg);
		},
		submitData : function( id ) {
			// var self = this;
			// if(!self.edit){
			// 	return;
			// }
			// var op = self.options;
			// upLoadAttach(self.attachArray, op.submit, id);
		},
		delImgD : function( id ) {
			var arr = this.attachArray;
			for( var i = 0; i < arr.length; i++ ) {
				if( arr[i].filePath == id ){
					arr.splice(i,1);
					break;
				}
			}
			this.render(arr);
		}
	});
	LAPP.Attach = Attach;
}());
