if(!LAPP){
	var LAPP = {};
}; 
(function () {
	var $$ = Zepto;
    var removeDiv = function() {
    	var ds = $$("body").find(".LAPPPage-animation-div");
    	for( var i = 0; i < ds.length; i++ ) {
    		if($$(ds[i]).html() == ""){
    			$$(ds[i]).remove();
    		}
    	}
    };
    var createDyContainer = function( pages, key ) {
    	if( $$("#"+key).length == 0 ) {
    		var DIV = '<div id="'+ key +'" class="LAPPPage-animation-div" style="display:none;position:absolute;left: 0px;width: 100%;height:100%;background-color:#fff;"></div>'; 
  	    	var D = $$(DIV);
  	    	D.appendTo("body");
    	}else{
    		var D = $$("#"+key);
    	}
    	var top = Number.MAX_VALUE;
    	if( !$$.isArray(pages) ) {
    		pages = [pages];
    	}
    	for( var i = 0; i < pages.length; i++ ) {
    		if( Number($$(pages[i]).css("top").replace("px","")) < top ) {
    			top = Number($$(pages[i]).css("top").replace("px",""));
    		}
    		if( $$(pages[i]).parent().length > 0 && $$(pages[i]).parent()[0].tagName == "BODY" ) {
    			$$(pages[i]).appendTo(D);
			}
    	}
    	return D;
    };
    var init = function( targetPage, key ) {
    	var o = "", n = "";
    	n = createDyContainer(targetPage, key );
    	return {
    		n : n
    	};
    };
    var perform = function(from, to, back, transition, cb ) {
        window.setTimeout(function() {
        	if(from==""){
        		to.show();
        		return;
        	}
        	from.addClass(transition + ' out');
            to.show();
            to.addClass(transition + ' in');
            if (back) {
            	from.addClass('reverse');
                to.addClass('reverse');
            }
        }, 1);
        window.setTimeout(function() {
        	if(from==""){
        		return;
        	}
        	from.removeClass(transition + ' out');
            to.removeClass(transition + ' in');
            from.removeClass('reverse');
            to.removeClass('reverse');
            from.hide();
            to.show();
            removeDiv();
            if($$.isFunction(cb)){
            	cb();
            }
        }, 505);
    };
    LAPP.animation = {};
    LAPP.animation.init = init;
    LAPP.animation.perform = perform;
})();

