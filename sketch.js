var twod = { 
  socket: null, 
  
  // create a connection to the camera feed 
  start: function () { 
    var url = "ws://" + host + "/twod"; 
    twod. socket = new WebSocket (url);
    
    // whenever a new frame is received... 
    twod.socket.onmessage = function (event) { 
    
      // parse and show the raw data 
      twod.show(JSON-parse(event.data)); 
    }
  } 
    // show the image by adjusting the source attribute of the HTML img object previously created 
    show: function (twod) {
  $('img. twod").attr("src", 'data:image/pnjpegg; base64', + twod.src);
  }
  }
