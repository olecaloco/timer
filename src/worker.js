let timer = null;

self.onmessage = function (ev) {
    if (!ev) return;

    if (ev.data === "start") {
        if (timer) {
            console.warn("Timer already running");
            return;
        }

        timer = setInterval(function () {
            postMessage(1);
        }, 1000);
    } else if (ev.data === "stop") {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }
};
