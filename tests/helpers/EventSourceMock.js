/* exports EventSource */

(function () {

    "use strict";

    var EventSource = function EventSource(url) {
        Object.defineProperty(this, "url", {value: url});

        EventSource.mockedeventsources.push(this);
        this.events = {
            init: [],
            close: [],
            notification: []
        };

        if (!EventSource.eventsourceconfs[url]) {
            setTimeout(function () {
                var i;

                for (i = 0; i < this.events.init.length; i++) {
                    try {
                        this.events.init[i]({data: "{\"id\": 1}"});
                    } catch (e) {}
                }
            }.bind(this), 0);
        }
        this.close = jasmine.createSpy('close');
    };

    EventSource.clear = function clear() {
        EventSource.mockedeventsources = [];
        EventSource.eventsourceconfs = {};
    };

    EventSource.prototype.addEventListener = function addEventListener(event_name, handler) {
        this.events[event_name].push(handler);
    };

    EventSource.prototype.removeEventListener = function removeEventListener(event_name, handler) {
        var index = this.events[event_name].indexOf(handler);
        if (index !== -1) {
            this.events[event_name].splice(index, 1);
        }
    };

    /* Detect Node.js */
    if ((typeof require === 'function') && typeof global != null) {
        global.EventSource = EventSource;
    } else {
        window.EventSource = EventSource;
    }

})();
