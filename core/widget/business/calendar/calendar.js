/**
 * @File 日历组件
 * @Import
 * @CreatedBy LAPP Mobile Components Development Group
 * @Module LAPP
 * @Date 2014-01-20
 */
"use strict";
if(!LAPP){
	var LAPP = {};
};
(function(){
	/*
	subEvent
	*/
	var subEvent = function(inst) {
		var me = inst
			, evts = new Map
			, control = inst.control
            ;
		evts.put('getParam', function (data) {
			me.getChooseDay();
		}, me);
		evts.put('dataFinish', function (data) {
			control.receiveData( data );
		}, me);
		return evts;
	};
	/*
	View
	*/
	var View = function (inst) {
		/*var __createHtml = function () {
			var html ='<div class="LAPP-calendar-box" id="data_box">'+
                '<div class="LAPP-calendar-sel-date">'+
                    '<div class="LAPP-calendar-clearfix">'+
                        '<div class="LAPP-calendar-title-container">'+
                        '<span class="LAPP-calendar-prev-y fl"></span><span class="LAPP-calendar-prev-m fl"></span>'+
                        '<div class="LAPP-calendar-show-mn">'+
                            '<span type="text" class="LAPP-calendar-showDate2 LAPP-calendar-year" value="选择年份"></span>'+
                            '<span class="LAPP-calendar-ml5 LAPP-calendar-mr5">年</span>'+
                            '<span type="text" class="LAPP-calendar-showDate2 LAPP-calendar-month" value="选择月份"></span>'+
                            '<span class="LAPP-calendar-ml5">月</span>'+
                        '</div>'+
                        '<span class="LAPP-calendar-next-y fr"></span><span class="LAPP-calendar-next-m fr"></span><div class="clear"></div>'+
                        '</div>'+
                    '</div>'+
                    '<table class="LAPP-calendar-data-table">'+
                        '<thead>'+
                            '<tr>'+
                                '<th class="calendarRed">日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th class="calendarRed">六</th>'+
                            '</tr>'+
                        '</thead>'+
                        '<tbody>'+
                            '<tr>'+
                                '<td class="calendarRed"></td><td></td><td></td><td></td><td></td><td></td><td class="calendarRed"></td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td class="calendarRed"></td><td></td><td></td><td></td><td></td><td></td><td class="calendarRed"></td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td class="calendarRed"></td><td></td><td></td><td></td><td></td><td></td><td class="calendarRed"></td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td class="calendarRed"></td><td></td><td></td><td></td><td></td><td></td><td class="calendarRed"></td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td class="calendarRed"></td><td></td><td></td><td></td><td></td><td></td><td class="calendarRed"></td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td class="calendarRed"></td><td></td><td></td><td></td><td></td><td></td><td class="calendarRed"></td>'+
                            '</tr>'+
                        '</tbody>'+
                    '</table>'+
                '</div>'+
			'</div>';
			return html;
		};*/
		this.init = function (data) {
			/*var html = __createHtml();
			inst.render(html);*/
            seajs.use("core/widget/component/calendar/calendar.js",function(){
            	LAPP.Component.Calendar({op:inst.options,componentData:data,callback:function(html){inst.render(html);}});
        	});
		};
	};
	/*
	Model
	*/
	var formatData = function( data ) {
		var o = {};
		var a = data.split("-");
		o = {
			y : Number(a[0]),
			m : Number(a[1]),
			d : Number(a[2])
		};
		return o;
	};
	/*
	Controller
	*/
	var Controller = function (inst) {
		this.receiveData = function ( data ) {
			var op = inst.options
				, cData = null
				, adpter = op.adpter
				, dbData = op.dbData
				;
			if( dbData != undefined ) {
				cData = data[dbData];
			}
			if( $.isFunction(adpter) ) {
				cData = adpter(data);
			}
			inst.setData(cData);
		};
	};
	/*
	Calendar
	*/
	var Calendar = Klass.define(LAPP.BasicPlug, {
		constructor: function (pointer) {
			this.$pointer = pointer;
			this.view = new View(this);
			this.control = new Controller(this);
		},
		setOptions: function (options) {
			var self = this
				, op = options
				, evts = subEvent(self)
				, defaultOptions = {
					render : "body",
					events : {
						id : self.componentId,
						el : "#"+options.render,
						evt: {
							'click td': 'clickDay'
						},
						handle: {
							"clickDay:before": function (p) {

								if ($(p.current).html() !== '') {
									if ($(p.current).attr('class') !== 'current') {
										$('td').removeClass('click');
										$(p.current).addClass('click');
									}
								}
							},
							"clickDay": function (p) {

							}
						}
					}
				};
			self.registerEvent(evts);
			self.options = $.extend(true , {}, defaultOptions, op);
			if(self.options.data){
				this.setData(self.options.data);
			}
			LAPP.Publisher.publish("businessWidgetLoaded", self);
		},
		setData : function( data ) {
			this.data = data;
            this.view.init(data);
		},
		render : function (html) {
			var self = this;
			var options = this.options;
			var renderTarget = options.render || 'wrapper',//渲染节点
				id= options.id;

			$('#' + renderTarget).html(html);

			self.dateText = $(".LAPP-calendar-showdate").get(0);
			self.dateBox = $(".LAPP-calendar-sel-date").get(0);
			self.yearBox = $(".LAPP-calendar-year").get(0);
			self.mnBox = $( ".LAPP-calendar-month").get(0);
			self.dataTable = $(".LAPP-calendar-data-table").get(0);
			self.tbody = self.dataTable.tBodies[0];
			self.td = self.tbody.getElementsByTagName("td");
			self.prevM= $(".LAPP-calendar-prev-m").get(0);
			self.nextM = $(".LAPP-calendar-next-m").get(0);
			self.prevY = $(".LAPP-calendar-prev-y").get(0);
			self.nextY = $(".LAPP-calendar-next-y").get(0);
			self.changeDefault(this);
			self.showNow();
            //点击切换月份
            self.prevM.onclick =self.nextM.onclick= function () {
                self.changeMn(this);
                return this;
            }
            //点击切换年份
            self.prevY.onclick = self.nextY.onclick = function () {
                self.changeYr(this);
                return this;
            }
			var now = new Date();
			var year = now.getFullYear();
			var month = now.getMonth()+1;
			this.currentDate = {
				y : year,
				m : month
			};
			this.changeStatus(year,month);
   			EventCollector.initEvents(options.events);
		},
		changeMn: function (obj) {//切换月份
			var _self = this;
            var NewMn = parseInt(_self.mnBox.innerText, 10);

            var newYear = parseInt(_self.yearBox.innerText, 10);
            if (obj == _self.nextM) {
                NewMn++;
            } else {
                NewMn--;
            }
            if (NewMn < 1) {
                NewMn = 12;
                newYear -= 1;
            } else if (NewMn > 12) {
                NewMn = 1;
                newYear += 1;
            }
            _self.mnBox.innerText = NewMn;
            _self.showNow(newYear, NewMn);
            _self.changeStatus(newYear, NewMn);
            this.currentDate = {
                y : newYear,
                m : NewMn
            };
            if (NewMn !== (new Date().getMonth() + 1)) {
                $('td').removeClass('current');
            }
            $('td').removeClass('click');
		},
		changeYr: function (obj) {
			var _self = this;
            var NewMn = parseInt(_self.mnBox.innerText, 10);
            var newYear = parseInt(_self.yearBox.innerText, 10);
            if (obj == _self.nextY) {
                newYear++;
            } else {
                newYear--;
            }
            if (newYear < 1900) {
                newYear = 1900;
            } else if (newYear > 2099) {
                newYear = 2099;
            }
            _self.mnBox.innerText = NewMn;
            _self.showNow(newYear, NewMn);
            _self.changeStatus(newYear, NewMn);
            this.currentDate = {
                y : newYear,
                m : NewMn
            };
		},
		changeDefault: function (obj) {
			var _self = this;
            var deVal = obj.defaultValue;
            if (obj.value == deVal) {
                obj.value = "";
            }
		},
		showNow: function (yr,mn) { //填充年、月
			var _self = this;
            var now = new Date();
            var year = yr || now.getFullYear();
            var month = mn-1 || now.getMonth();
            var dd = now.getDate();
            //填充 年 和 月
            _self.yearBox.innerText = year;
            _self.mnBox.innerText = mn || now.getMonth()+1;
            //填充日期
            _self.showAllDay(year, month, dd);
		},
		showAllDay: function (Yr, Mn, Dd) {//填充当月的所有日期
			var _self = this;
            var arr31 = [1, 3, 5, 7, 8, 10, 12];
            var is31 = true;
            var newDd = new Date();  //根据传入的数值生成新的日期
            newDd.setFullYear(Yr,Mn,Dd);
            var year = newDd.getFullYear(),
                month = newDd.getMonth(),
                dd = newDd.getDate()
                ;
            var firstD = new Date();
            firstD.setFullYear(year, month, 1);
            var firstDay = firstD.getDay();
            var str31 = arr31.join(",");
            var regExp = eval("/" + (month + 1) + ",|," + (month + 1) + ",|," + (month + 1) + "/g");
            var dayLen = 31;
            //判断每个月有多少天
            if (str31.search(regExp) == -1) {
                dayLen = 30;
            }
            if( month == 1 ) {
                if((year%4==0 && year%100!=0)||(year%100==0 && year%400==0)) {
                    dayLen = 29;
                }else {
                    dayLen = 28;
                }
            }
            //清空日期
            for (var i = 0; i < _self.td.length; i++) {
                _self.td[i].innerHTML = "";
                _self.td[i].className = _self.td[i].className.replace("current", "");
                $(_self.td[i]).removeClass("active");
            }
            //如果有31天
            for (var j = 0; j < dayLen; j++) {
                _self.td[j + firstDay].innerHTML = j + 1;
                if (j + 1 == dd && _self.td[j + firstDay].className.indexOf("current")==-1) {
                    _self.td[j + firstDay].className += " ";
                    _self.td[j + firstDay].className += "current";
                }
            }
		},
		changeStatus : function(newYear, NewMn) {
			console.info(0);
			var data = this.data
				, td = this.td
				, i = 0
				, temp
				;
			for( ; i < data.length; i++ ) {
				var temp = data[i];
				var o = formatData(temp);
				if( o.y == newYear && o.m == NewMn ) {
					for( var j = 0; j < td.length; j++ ) {
						temp = Number(td[j].innerHTML);
						if( temp == o.d ) {
							td[j].className += " active";
						}
					}
				}
			}
		},
		getChooseDay : function() {
			var _self = this;
			var NewMn = parseInt(_self.mnBox.innerText, 10);
			var newYear = parseInt(_self.yearBox.innerText, 10);

			var td = this.td
				, op = this.options
				, i = 0
				, data = []
				, obj = {}
				;
			for( ; i < td.length; i++ ) {
				if($(td[i]).hasClass("click")) {
					this.currentDate = {
                        y : newYear,
                        m : NewMn
                    };
					var text = (this.currentDate.y) + "-" + (this.currentDate.m) + "-" + $(td[i]).text;
					data.push(text);
				}
			}
			obj[op.id] = data;
			LAPP.Publisher.publish("setParam", {id : op.id, data : obj}, this);
		}
	});
	LAPP.Calendar = Calendar;
}());
