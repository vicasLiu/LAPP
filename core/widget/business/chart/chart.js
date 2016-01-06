/**
 * @license LAPPCHART JS v1.0 (2014-06-16)
 * (c) 2013-2014 liusiwei
 * License: www.kingnode.com/license
 * 
 * @include chartRender.js
 */

"use strict";
if(!LAPP){
	var LAPP = {};
};
(function(){
	var subEvent = function(inst) {
		var me = inst;
		LAPP.Publisher.unsubscribe("dataFinish", me);
		LAPP.Publisher.subscribe("dataFinish", function( data ){
			dataControler.receiveData( me, data );
		}, me);
	};
	var dataControler = {
		receiveData : function( inst, data ) {
			inst.setData(data);
		}
	};
	var Chart = function( pointer ) {
		this.$pointer = pointer;
	};
	Chart.prototype = {
		constructor : Chart,
		getSubId : function() {
			return this.$pointer;
		},
		getActive : function() {
			return this.$active;
		},
		setActive : function( flg ) {
			this.$active = flg+"";
		},
		setData : function( data ) {
			this.data = data;
			this.$isDataReady = true;
			if( this.$isDataReady && this.$isOptionsReady ) {
				this.render();
			}
		},
		init : function( options ) {
			this.$isOptionsReady = false;
			this.$isDataReady = false;
			subEvent(this);
			this.setOptions(options);
		},
		setOptions : function( options ) {
			var self = this;
			self.options = options;
			self.$isOptionsReady = true;
			if( LAPP.Util.isArray(options.data) ) {
				self.setData(options.data);
			}
			LAPP.Publisher.publish("businessWidgetLoaded", self);
		},
		render : function() {
			var data = this.data;
			var options = this.options;
			var dataFormat = options.dataFormat;
			var chartData = data;
			if( LAPP.Util.isFunction(dataFormat) ) {
				chartData = dataFormat(data);
			}
			if( chartData.length == 0 ){
				return;
			}
			options.data = chartData;
			var id = $("#"+options.render);
			id.show();
			var chart = new LAPPChart.Chart(id);
			chart.setOptions(options);
			chart.draw();
		}
	};
	LAPP.Chart = Chart;
}());