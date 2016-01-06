(function(){
	var touchable = "ontouchstart" in window;
    var clickEvent = touchable ? "touchstart" : "click",        
        mouseDownEvent = touchable ? "touchstart" : "mousedown",
        mouseUpEvent = touchable ? "touchend" : "mouseup",
        mouseMoveEvent = touchable ? "touchmove" : "mousemove",
        mouseMoveOutEvent = touchable ? "touchleave" : "mouseout";

    var _returnData = function(evt){
        var neweEvt = {};
        var cev = evt.originalEvent;
        if( cev == undefined ) {
            cev = evt;
        }
        if(cev.changedTouches){
            neweEvt.pageX = cev.changedTouches[0].pageX;
            neweEvt.pageY = cev.changedTouches[0].pageY;
            neweEvt.clientX = cev.changedTouches[0].clientX;
            neweEvt.clientY = cev.changedTouches[0].clientY;
        }else{
            neweEvt.pageX = evt.pageX;
            neweEvt.pageY = evt.pageY;
            neweEvt.clientX = evt.clientX;
            neweEvt.clientY = evt.clientY;
        }
        neweEvt.evt = evt;
        return neweEvt;
    };
    var getTouchPos = function(e){
        return { x : e.clientX , y: e.clientY };
    }
    //计算两点之间距离
    var getDist = function(p1 , p2){
        if(!p1 || !p2) return 0;
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    };
    //获取swipe的方向
    var getSwipeDirection = function(p2,p1){
        var dx = p2.x - p1.x;
        var dy = -p2.y + p1.y;  
        var angle = Math.atan2(dy , dx) * 180 / Math.PI;

        if(angle < 45 && angle > -45) return "right";
        if(angle >= 45 && angle < 135) return "top";
        if(angle >= 135 || angle < -135) return "left";
        if(angle >= -135 && angle <= -45) return "bottom";
    };
    var getAngle = function(p2,p1){
        var dx = p2.x - p1.x;
        var dy = -p2.y + p1.y;  
        var angle = Math.atan2(dy , dx) * 180 / Math.PI;
        return angle;
    };
    var _onClick = function(dom, evt, callback){
        startTime = Date.parse(new Date());
        var neweEvt = _returnData(evt);
        callback(dom, neweEvt); 
    };
    var _onClickDown = function(dom, evt, callback){
        var neweEvt = _returnData(evt);
        callback(dom, neweEvt);
    };
    var _onClickUp = function(dom, evt, callback){
        var neweEvt = _returnData(evt);
        callback(dom, neweEvt);
    };
    var _onMove = function(dom, evt, callback){
        var neweEvt = _returnData(evt);
        callback(dom, neweEvt);
    };
    var _onOut = function(evt, callback){
        var neweEvt = _returnData(evt);
        callback(dom, neweEvt);
    };
    var Events = {
        bindEvent : function(rootEle, element, type, eventHandle){
            switch(type){
                case "mousemove" : 
                case "touchmove" : 
                    rootEle.off(mouseMoveEvent, element).on(mouseMoveEvent, element, function(e){
                        _onMove($(this), e, eventHandle);
                    });
                    break;
                case "click" : 
                case "tap" : 
                    //按下松开之间的移动距离小于20，认为发生了tap
                    var TAP_DISTANCE = 20;
                    var pt_pos;
                    var ct_pos;
                    var startEvtHandler = function(e){
                        var ev = _returnData(e);
                        ct_pos = getTouchPos(ev);
                    };
                    var endEvtHandler = function(dom_,e, fn){
                       // e.stopPropagation();//加了这句listloading会失效
                        var ev = _returnData(e);
                        var now = Date.now(); 
                        var pt_pos = getTouchPos(ev);
                        var dist = getDist(ct_pos , pt_pos);
                        if(dist < TAP_DISTANCE){
                            _onClick(dom_, e, eventHandle);
                        }
                    };
                    rootEle.off(mouseDownEvent, element).on(mouseDownEvent, element, function(e){
                        startEvtHandler(e);
                    });
                    rootEle.off(mouseUpEvent, element).on(mouseUpEvent, element, function(e){
                        //_onClick($(this), e, eventHandle);
                        var $this = $(this);
                        endEvtHandler($this,e,eventHandle);
                    });
                    break;
                case "mousedown" : 
                case "touchstart" : 
                    rootEle.off(mouseDownEvent, element).on(mouseDownEvent, element, function(e){
                        _onClickDown($(this), e, eventHandle);
                    });
                    break;
                case "mouseup" : 
                case "touchend" : 
                    rootEle.off(mouseUpEvent, element).on(mouseUpEvent, element, function(e){
                        _onClickUp($(this), e, eventHandle);
                    });
                    break;
                case "mouseout" : 
                    rootEle.off(mouseMoveOutEvent, element).on(mouseMoveOutEvent, element, function(e){
                        endEvtHandler(e, eventHandle);
                    });
                    break;
                case "swipe": 
                    var arg = eventHandle();
                    var startEvent = arg["sCallback"],
                        moveEvent = arg["mCallback"],
                        endEvent = arg["eCallback"];
                    //按下之后移动30px之后就认为swipe开始
                    var SWIPE_DISTANCE = 30;
                    //swipe最大经历时间
                    var SWIPE_TIME = 500;
                    var pt_pos;
                    var ct_pos;
                    var pt_time;
                    var pt_up_time;
                    var pt_up_pos;
                    var pt_move_pos;
                    var startEvtHandler = function(dom_, e){
                       // e.stopPropagation();
                        var ev = _returnData(e);
                        pt_pos = ct_pos = getTouchPos(ev);
                        pt_move_pos = pt_pos;
                        pt_time = Date.now();
                        startEvent(dom_, ev);
                    }
                    var moveEvtHandler = function(dom_, e){
                        //e.stopPropagation();
                        //e.preventDefault();
                        var ev = _returnData(e);
                        ct_pos = getTouchPos(ev);
                        if(pt_pos == undefined) {
                            return;
                        }
                        var dir = getSwipeDirection(ct_pos,pt_pos);
                        var dist = getDist(pt_pos,ct_pos);
                        var angle = getAngle(ct_pos,pt_move_pos);
                        ev.dir = dir;
                        ev.angle = angle;
                        ev.dist = getDist(pt_pos,pt_up_pos);
                        moveEvent(dom_, ev);
                        pt_move_pos = ct_pos;
                    }
                    var endEvtHandler = function(dom_, e){
                        // e.stopPropagation();
                        var dir;
                        var ev = _returnData(e);
                        pt_up_pos = ct_pos;
                        pt_up_time = Date.now();
                        if(getDist(pt_pos,pt_up_pos) > SWIPE_DISTANCE){
                            //pt_up_time - pt_time
                            dir = getSwipeDirection(pt_up_pos,pt_pos);
                            ev.dir = dir;
                            ev.dist = getDist(pt_pos,pt_up_pos);
                            ev.tm = pt_up_time - pt_time;
                            endEvent(dom_, ev);
                        }
                        pt_pos = undefined;
                    }   
                    rootEle.on(mouseDownEvent, element, function(e){
                        var $this = $(this);
                        startEvtHandler($this, e);
                    });
                    rootEle.on(mouseMoveEvent, element, function(e){
                        var $this = $(this);
                        moveEvtHandler($this, e);
                    }); 
                    rootEle.on(mouseUpEvent, element, function(e){
                        var $this = $(this);
                        endEvtHandler($this, e);
                    }); 
                    break;
                case "hold" : 
                    //按下松开之间的移动距离小于20，认为点击生效
                    var HOLD_DISTANCE = 20;
                    //按下两秒后hold触发
                    var HOLD_TIME = 2000;
                    var holdTimeId;
                    var pt_pos;
                    var ct_pos;
                    var startEvtHandler = function(dom_,e,fn){
                        e.stopPropagation();
                        var ev = _returnData(e);
                        var touches = e.touches;
                        if(!touches || touches.length == 1){//鼠标点击或者单指点击
                            pt_pos = ct_pos = getTouchPos(ev);
                            pt_time = Date.now();
                            holdTimeId = setTimeout(function(){
                                if(touches && touches.length != 1) return;
                                if(getDist(pt_pos,ct_pos) < HOLD_DISTANCE){
                                    fn(dom_, ev);
                                }
                            },HOLD_TIME);
                        }
                    }
                    var endEvtHandler = function(e){
                        e.stopPropagation();
                        clearTimeout(holdTimeId);
                    }
                    rootEle.off(mouseDownEvent, element).on(mouseDownEvent, element, function(e){
                        var $this = $(this);
                        startEvtHandler($this,e,eventHandle);
                    });
                    rootEle.off(mouseUpEvent, element).on(mouseUpEvent, element, function(e){
                        endEvtHandler(e);
                    });
                    break;
            };
        }
    };
	LAPP.Events = Events;
}());


var LAPPEMG = {};
LAPPEMG.events = {};
LAPPEMG.interceptors = {};
LAPPEMG.Constant = {
    SCOPE: " __ALL__ "
};
LAPPEMG.registerEvent = function(eventalias, event, scope) {
    if (typeof(scope) == 'undefined') {
        scope = LAPPEMG.Constant.SCOPE
    }
    if (LAPPEMG.events[scope] == null) {
        LAPPEMG.events[scope] = {}
    }
    LAPPEMG.events[scope][eventalias] = event
};
LAPPEMG.unregisterEvent = function(eventalias, scope) {
    if (typeof(scope) == 'undefined') {
        scope = LAPPEMG.Constant.SCOPE
    }
    LAPPEMG.events[scope][eventalias] = null
};
LAPPEMG.Interceptor = {
    BEFORE: " before ",
    AFTER: " after "
};
LAPPEMG.clear = function(scope) {
    if (typeof(scope) == 'undefined') {
        LAPPEMG.events = {};
        LAPPEMG.interceptors = {}
    } else {
        LAPPEMG.events[scope] = null;
        LAPPEMG.interceptors[scope] = null
    }
};
LAPPEMG.directyinvoke = function(eventalias, params, scope) {
    if (typeof(scope) == 'undefined') {
        scope = LAPPEMG.Constant.SCOPE
    }
    if (LAPPEMG.events[scope] == null) {
        return
    }
    var bindevent = LAPPEMG.events[scope][eventalias];
    if (bindevent != null) {
        LAPPEMG.invokeInterceptor(eventalias, LAPPEMG.Interceptor.BEFORE, params, scope);
        bindevent.call(this, params);
        LAPPEMG.invokeInterceptor(eventalias, LAPPEMG.Interceptor.AFTER, params, scope)
    }
};
LAPPEMG.invoke = function(eventalias, params, scope) {
    LAPPEMG.directyinvoke(eventalias, params, scope)
};
LAPPEMG.invokeInterceptor = function(eventalias, type, params, scope) {
    if (LAPPEMG.interceptors[scope] == null) {
        return
    }
    var interceptors = LAPPEMG.interceptors[scope][eventalias];
    if (typeof(interceptors) == 'undefined') {
        return
    }
    var typeInterceptors = interceptors[type];
    if (typeInterceptors == null) {
        return
    }
    for (var i = 0; i < typeInterceptors.length; i++) {
        typeInterceptors[i].call(this, params)
    }
};
LAPPEMG.addBeforeInterceptor = function(eventalias, interceptor, scope) {
    LAPPEMG.addInterceptor(eventalias, interceptor, LAPPEMG.Interceptor.BEFORE, scope)
};
LAPPEMG.removeBeforeInterceptor = function(eventalias, interceptor, scope) {
    LAPPEMG.removeInterceptor(eventalias, interceptor, LAPPEMG.Interceptor.BEFORE, scope)
};
LAPPEMG.addAfterInterceptor = function(eventalias, interceptor, scope) {
    LAPPEMG.addInterceptor(eventalias, interceptor, LAPPEMG.Interceptor.AFTER, scope)
};
LAPPEMG.removeAfterInterceptor = function(eventalias, interceptor, scope) {
    LAPPEMG.removeInterceptor(eventalias, interceptor, LAPPEMG.Interceptor.AFTER, scope)
};
LAPPEMG.addInterceptor = function(eventalias, interceptor, type, scope) {
    if (typeof(scope) == 'undefined') {
        scope = LAPPEMG.Constant.SCOPE
    }
    if (LAPPEMG.interceptors[scope] == null) {
        LAPPEMG.interceptors[scope] = {}
    }
    var interceptors = LAPPEMG.interceptors[scope][eventalias];
    if (interceptors == null) {
        interceptors = {}
    }
    if (interceptors[type] == null) {
        interceptors[type] = new Array()
    }
    if (LAPPEMG.interceptors[scope][eventalias] == undefined) {
        interceptors[type].push(interceptor);
        LAPPEMG.interceptors[scope][eventalias] = interceptors
    }
};
LAPPEMG.removeInterceptor = function(eventalias, interceptor, type, scope) {
    if (typeof(scope) == 'undefined') {
        scope = LAPPEMG.Constant.SCOPE
    }
    if (LAPPEMG.interceptors[scope] == null) {
        return
    }
    var interceptors = LAPPEMG.events[scope][eventalias];
    if (interceptors == null) {
        return
    }
    if (interceptors[type] == null) {
        return
    }
    interceptors[type].pop(interceptor);
    LAPPEMG.interceptors[scope][eventalias] = interceptors
};
var EventCollector = {};
EventCollector.delegate = function(pDom, dom, evType, fnName, handle, scop) {
    var fn = handle[fnName];
    if (handle[fnName] != undefined) {
        LAPPEMG.registerEvent(fnName, fn, scop)
    }
    if (handle[fnName + ":before"] != undefined) {
        fn = handle[fnName + ":before"];
        LAPPEMG.addBeforeInterceptor(fnName, fn, scop)
    } else if (handle[fnName + ":after"] != undefined) {
        fn = handle[fnName + ":after"];
        LAPPEMG.addAfterInterceptor(fnName, fn, scop)
    }
    if(evType == "swipe") {
    	LAPP.Events.bindEvent($(pDom), dom, evType, fn);
    }else{
    	LAPP.Events.bindEvent($(pDom), dom, evType, function( currentDom, evt ){
        	LAPPEMG.invoke(fnName, {
        		 ev: evt,
        		 current: currentDom
        	},scop);
        });
    }
//    $(pDom).off(evType, dom).on(evType, dom, function(e) {
//        LAPPEMG.invoke(fnName, {
//            ev: e,
//            current: $(this)
//        }, scop)
//    })
};
EventCollector.initEvents = function(arg) {
    var el = arg.el,
        evts = arg.evt,
        handles = arg.handle,
        scop = arg.id;
    for (var ev in evts) {
        var aEvents = ev.split(" ");
        var dom = aEvents[1];
        var evTypes = aEvents[0];
        var aTypes = evTypes.split(":");
        var evType = aTypes[0];
        var fnName = evts[ev];
        EventCollector.delegate(el, dom, evType, fnName, handles, scop);
    }
};
LAPP.Publisher = {
    subscribe: function(eventName, callback, inst) {
        var ev, suber, subscribeId, pointer = inst;
        subscribeId = pointer.getSubId();
        if (!subscribeId) {
            return
        }
        if (!LAPP.Publisher.subers) {
            LAPP.Publisher.subers = {}
        }
        if (!LAPP.Publisher.subers[subscribeId]) {
            LAPP.Publisher.subers[subscribeId] = {};
            LAPP.Publisher.subers[subscribeId].callbacks = {}
        }
        suber = LAPP.Publisher.subers[subscribeId];
        (suber.callbacks[eventName] || (suber.callbacks[eventName] = [])).push({
            'scope': inst,
            'fun': callback
        })
    },
    publish: function() {
        var eventName, args, pointer, list, i, suber, subscribeId, inst, temp, cid, aPointer;
        var argArr = Array.prototype.slice.call(arguments, 0);
        if (arguments.length > 1) {
            eventName = argArr.shift();
            args = argArr;
            inst = argArr.pop();
            pointer = inst
        } else {
            return
        }
        subscribeId = pointer.getSubId();
        suber = LAPP.Publisher.subers && LAPP.Publisher.subers[subscribeId];
        cid = pointer.componentId;
        if (!suber || !suber.callbacks) {
            return
        }
        if (suber.callbacks[eventName]) {
            list = suber.callbacks[eventName];
            for (i = 0; i < list.length; i++) {
                temp = list[i].scope;
                var subId = temp.subId;
                if ((typeof subId == "undefined" || typeof cid == "undefined") && temp.getActive() != "false") {
                    list[i].fun.apply(temp, args)
                } else if (LAPP.Util.isArray(subId) && $.inArray(cid, subId) != -1) {
                    list[i].fun.apply(temp, args)
                } else if (subId == cid) {
                    list[i].fun.apply(temp, args)
                }
            }
        }
    },
    unsubscribe: function() {
        var eventName, fun, subscribeId, pointer, i;
        if (arguments.length == 3) {
            eventName = arguments[0];
            fun = arguments[1];
            pointer = arguments[2]
        } else if (arguments.length == 2) {
            eventName = arguments[0];
            pointer = arguments[1]
        } else {
            return
        }
        subscribeId = pointer.getSubId();
        var suber = LAPP.Publisher.subers && LAPP.Publisher.subers[subscribeId];
        if (!suber || !suber.callbacks) {
            return
        }
        var callbacks = suber && suber.callbacks;
        for (name in callbacks) {
            if (name === eventName) {
                for (i = 0; i < callbacks[eventName].length; i++) {
                    if (pointer.componentId === callbacks[eventName][i].scope.componentId) {
                        callbacks[eventName].splice(i, 1);
                        i--
                    }
                }
            }
        }
    }
};
