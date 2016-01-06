/**
 *
 */
"use strict";
if (!LAPP) {
	var LAPP = {};
};
(function( win ){
	var subEvent = function( inst, evts ) {
		var events = evts.keys()
			, eventName = ""
			, eventFn = null
			, pub = LAPP.Publisher
			;
		for( var i = 0; i < events.length; i++ ) {
			eventName = events[i];
			eventFn = evts.get(eventName);
			pub.unsubscribe(eventName, inst);
			pub.subscribe(eventName, eventFn, inst);
		}
	};
	var BasicPlug = Klass.define({
		constructor : function( pointer ) {
			this.$pointer = pointer;
		},
		registerEvent : function( evts ) {
			subEvent(this, evts);
		},
		getSubId : function() {
			return this.$pointer;
		},
		setActive : function( flg ) {
			this.$active = flg+"";
		},
		getActive : function() {
			return this.$active;
		},
		init : function( options ) {
			this.setOptions(options);
			this.pluginEvents(options.events);
		},
		setOptions : function( options ) {
			this.options = options;
		},
		pluginEvents: function () {
			this.options.events&&EventCollector.initEvents(this.options.events);
		},
		setData : function( data ) {
			this.data = data;
		},
		render : function() {

		}
	});
	LAPP.BasicPlug = BasicPlug;
}(window));
