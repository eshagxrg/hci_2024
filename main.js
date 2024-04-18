var host = "cpsc484-04.stdusr.yale.internal:8888";
$(document).ready(function() {
  sp2tx.start();
});

var sp2tx = {
  socket: null,

  start: function() {
    var url = "ws://" + host + "/sp2tx";
    sp2tx.socket = new WebSocket(url);
    sp2tx.socket.onmessage = function (event) {
      var text = event.data;
      //console.log("/sp2tx recived: "+text);
      if (text !== "") {
        if (text!= "You"){
          console.log("/sp2tx received: "+text);
        }
        if (text === "Surprise Me") {
          surpriseMe();
        } else if (text === "Guided breathing.") {
          window.location.href = "breathing.html"; 
        } else if (text === "Mindfulness activity.") {
          window.location.href = "mindfulness.html"; 
        } else if (text === "Stretching") {
          window.location.href = "stretching.html";
        } else {
        
        }
      }
    }
  }
};


function surpriseMe() {
  const randomNumber = Math.random(); 

  if (randomNumber <= 1/3) {
    window.location.href = "breathing.html"; 
  } else if (randomNumber <= 2/3) {
    window.location.href = "mindfulness.html"; 
  } else {
    window.location.href = "stretching.html"; 
}
