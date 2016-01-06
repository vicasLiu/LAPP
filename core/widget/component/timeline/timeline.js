/**
 * Created by Gaotd 2015-1-21
 */

"use strict";
if(!LAPP){
    var LAPP = {};
};
if (!LAPP.Component) {
    LAPP.Component = {};
}
(function (win, undefined) {
    var url = [
        "css/component/timeline/timeline.css"
        // "css/component/timeline/timelineOrange.css",  // Orange
        // "css/component/timeline/timelinePurple.css",  // Purple
    ];
    var createHtml = function (args) {
        var op  = args.op
            , render = op.render
            , tpl = __createTpl(args)
            , data = args.componentData
            , Timeline  = {_data:data}
            , html = '';
        html += juicer(tpl, Timeline);
        return html;
    };
    var __createTpl = function(args) {
        var id = args.op.id,
        _html = '';
        _html += '<section id="'+id+'" class="LAPP-component-timeline">';
        _html += '{@each _data as item, index}';
            _html += '<article class="LAPP-component-timeline-art">';
                _html += '<h3 class="LAPP-component-timeline-art-h3"><time>${item.time}</time><span>${item.description}</span></h3>';
                _html += '<ul class="LAPP-component-timeline-art-ul">';
                    _html += '{@each item.list as item1, index1}';
                    _html += '<li><em></em>${item1}</li>';
                    _html += '{@/each}';
                _html += '</ul>';
            _html += '</article>';
        _html += '{@/each}';
        _html += '</section>';
        return _html;
    };
    var Timeline = function (args) {
        var cb = args.callback;
        seajs.use(url, function(){
            var htm = createHtml(args);
            if( $.isFunction(cb) ) {
                cb(htm);
            }
        });
    };
    LAPP.Component.Timeline = Timeline;
})(window);

