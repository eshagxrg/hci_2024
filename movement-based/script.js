var host = "cpsc484-04.stdusr.yale.internal:8888";

$(document).ready(function() {
  frames.start();
  twod.start();
});

var frames = {
  socket: null,

  start: function() {
    var url = "ws://" + host + "/frames";
    frames.socket = new WebSocket(url);
    frames.socket.onmessage = function (event) {
      var command = frames.get_left_wrist_command(JSON.parse(event.data));
      var currentPageId = getCurrentPageId();
      if (currentPageId === 'welcomePage') {
        welcomeCommand(command);
      } else if (currentPageId === 'activitySelectPage') {
        sendWristCommand(command);
      }
    }
  },

  get_left_wrist_command: function (frame) {
    var command = null;
    if (frame.people.length < 1) {
      return command;
    }

    // Normalize by subtracting the root (pelvis) joint coordinates
    var pelvis_x = frame.people[0].joints[0].position.x;
    var pelvis_y = frame.people[0].joints[0].position.y;
    var pelvis_z = frame.people[0].joints[0].position.z;
    var left_wrist_x = (frame.people[0].joints[7].position.x - pelvis_x) * -1;
    var left_wrist_y = (frame.people[0].joints[7].position.y - pelvis_y) * -1;
    var left_wrist_z = (frame.people[0].joints[7].position.z - pelvis_z) * -1;

    if (left_wrist_z < 100) {
      return command;
    }

    if (left_wrist_x < 200 && left_wrist_x > -200) {
      if (left_wrist_y > 500) {
        command = 73; // UP
      } else if (left_wrist_y < 100) {
        command = 75; // DOWN
      }
    } else if (left_wrist_y < 500 && left_wrist_y > 100) {
      if (left_wrist_x > 200) {
        command = 76; // RIGHT
      } else if (left_wrist_x < -200) {
        command = 74; // LEFT
      }
    }
    return command;
  }
};

var twod = {
  socket: null,

  start: function() {
    var url = "ws://" + host + "/twod";
    twod.socket = new WebSocket(url);
    twod.socket.onmessage = function(event) {
      twod.show(JSON.parse(event.data));
    }
  },

  show: function(twod) {
    $('.twod').attr("src", 'data:image/pnjpegg;base64,'+twod.src);
  }
};

function getCurrentPageId() {
    var currentPageId = document.body.id;
    return currentPageId;
}

function navigateTo(pageId) {
  $("#" + currentPageId).hide();
  $("#" + pageId).show();
  currentPageId = pageId;
}

function welcomeCommand(command) {
  switch (command) {
    case 73:
      //UP
      navigateTo('activitySelectPage');
      break;
  }
}

function sendWristCommand(command) {
  var currentPageId = getCurrentPageId();
  switch (command) {
    case 74:
      //LEFT
      if (currentPageId !== 'breathingPage') {
        navigateTo('breathingPage');
        setTimeout(function() {
          navigateTo('breathing2Page');
        }, 5000);
      }
      break;
      
    case 76:
      //RIGHT
      if (currentPageId !== 'mindfulnessPage') {
        navigateTo('mindfulnessPage');
      }
      break;
    case 73:
      //UP
      if (currentPageId !== 'stretchingPage') {
        navigateTo('stretchingPage');
        setTimeout(function() {
          navigateTo('stretching2Page');
        }, 5000);
      }
      break;

    case 75:
      //DOWN
      if (currentPageId !== 'activitySelectPage') {
        navigateTo('activitySelectPage');
      }
      break;
  }
}

// var host = "cpsc484-04.stdusr.yale.internal:8888";

// $(document).ready(function() {
//   frames.start();
//   twod.start();
// });

// var frames = {
//   socket: null,

//   start: function() {
//     var url = "ws://" + host + "/frames";
//     frames.socket = new WebSocket(url);
//     frames.socket.onmessage = function (event) {
//       var command = frames.get_left_wrist_command(JSON.parse(event.data));
//       if (command !== null) {
//         sendWristCommand(command);
//       }
//     }
//   },



//   get_left_wrist_command: function (frame) {
//     var command = null;
//     if (frame.people.length < 1) {
//       return command;
//     }

//     // Normalize by subtracting the root (pelvis) joint coordinates
//     var pelvis_x = frame.people[0].joints[0].position.x;
//     var pelvis_y = frame.people[0].joints[0].position.y;
//     var pelvis_z = frame.people[0].joints[0].position.z;
//     var left_wrist_x = (frame.people[0].joints[7].position.x - pelvis_x) * -1;
//     var left_wrist_y = (frame.people[0].joints[7].position.y - pelvis_y) * -1;
//     var left_wrist_z = (frame.people[0].joints[7].position.z - pelvis_z) * -1;

//     if (left_wrist_z < 100) {
//       return command;
//     }

//     if (left_wrist_x < 200 && left_wrist_x > -200) {
//       if (left_wrist_y > 500) {
//         command = 73; // UP
//       } else if (left_wrist_y < 100) {
//         command = 75; // DOWN
//       }
//     } else if (left_wrist_y < 500 && left_wrist_y > 100) {
//       if (left_wrist_x > 200) {
//         command = 76; // RIGHT
//       } else if (left_wrist_x < -200) {
//         command = 74; // LEFT
//       }
//     }
//     return command;
//   }
// };

// var twod = {
//   socket: null,

//   start: function() {
//     var url = "ws://" + host + "/twod";
//     twod.socket = new WebSocket(url);
//     twod.socket.onmessage = function(event) {
//       twod.show(JSON.parse(event.data));
//     }
//   },

//   show: function(twod) {
//     $('.twod').attr("src", 'data:image/pnjpegg;base64,'+twod.src);
//   }
// };

// let currentPage = "welcomePage";

// function navigateTo(pageId) {
//   $("#" + currentPage).hide();
//   $("#" + pageId).show();
//   currentPage = pageId;
// }

// function sendWristCommand(command) {
//   switch (command) {
//     case 74:
//       //LEFT
//       if (currentPage !== 'breathingPage') {
//         navigateTo('breathingPage');
//       }
//       break;
      
//     case 76:
//       //RIGHT
//       if (currentPage !== 'mindfulnessPage') {
//         navigateTo('mindfulnessPage');
//       }
//       break;
//     case 73:
//       //UP
//       if (currentPage !== 'stretchingPage') {
//         navigateTo('stretchingPage');
//       }
//       break;

//     case 75:
//       //DOWN
//       if (currentPage !== 'activitySelectPage') {
//         navigateTo('activitySelectPage');
//       }
//       break;
//   }
// }


// function welcomeCommand(command) {
//   switch (command) {
    
//     case 73:
//       //UP
//       if (currentPage !== 'activitySelectPage') {
//         navigateTo('activitySelectPage');
//       }
//       break;

//   }
// }
