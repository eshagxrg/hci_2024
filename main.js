var socket = new WebSocket("ws://cpsc484-04.stdusr.yale.internal:8888/frames");


var whisper = {
    socket: null,

    start: function() {
        var url = "ws://cpsc484-04.stdusr.yale.internal:8888/frames" + host + "sp2tx";
        whisper.socket = new WebSocket(url);
        whisper.socket.onmessage = function (event) {
            whisper.show(event.data);
        }
    },
    show: function (sp2tx) {
        console.log(sp2tx)
    }
}