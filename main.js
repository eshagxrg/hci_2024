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
}

document.addEventListener("DOMContentLoaded", function() {
  const gifs = ["images/gif2.gif", "images/gif3.gif", "images/gif4.gif"];
  //const gifs = ["images/stretch2.gif", "images/stretch3.gif", "images/stretch4.gif"];
  let currentGifIndex = 0;
  const gifElement = document.getElementById('stretchGif');

  // Function to change the GIF
  function changeGif() {
      gifElement.src = gifs[currentGifIndex];
      currentGifIndex = (currentGifIndex + 1) % gifs.length;
  }

  // Set interval to change GIF every 15 seconds
  setInterval(changeGif, 15000);
});


document.addEventListener("DOMContentLoaded", function() {
  // Get all messages
  const messages = document.querySelectorAll('.message');
  
  // Hide all messages initially
  messages.forEach(message => {
      message.style.display = 'none';
  });

  // Randomly pick one message to display
  const randomIndex = Math.floor(Math.random() * messages.length);
  messages[randomIndex].style.display = 'block';
});

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
      // Update the text content
      document.getElementById('congratulationMessage').textContent = 'Have Feedback?';
      document.getElementById('farewellMessage').innerHTML = 'Scan the QR code below and let us know<br>what is working and what is not!';

      // Display the QR code
      document.getElementById('qrCodeContainer').style.display = 'block';
  }, 3000); // 3000 milliseconds = 3 seconds
});
