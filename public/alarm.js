// Your web app's Firebase configuration
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//write time to database
function setAlarm() {
  var time = document.getElementById("alarm").elements[0].value;

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  if (today.getHours() >= 19) {
    date = today.getFullYear()+'-'+(today.getMonth()+1)+'-' + (today.getDate() + 1);
  }

  // if month is single digit
  if (today.getMonth() < 10) {
    splice = date.split("-")
    date = splice[0] + "-0" + splice[1] + "-" + splice[2]
  }

  // if day is single digit
  if (today.getMonth() < 10) {
    splice = date.split("-")
    date = splice[0] + "-" + splice[1] + "-0" + splice[2]
  }

  // Write time as "{:%Y-%m-%d %H:%M}"
  //       ex: '2020-02-02 20:16'
  firebase.database().ref("Time").set({
    time: date + " " + time
  });
}


function fanTimer(length) {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  var time = "";

  if (today.getMinutes() + length <= 59) {
    time = today.getHours() + ":" + (today.getMinutes() + length);
  }
  else if (today.getMinutes() + length > 59 && today.getHours != 0) {
    time = (today.getHours() + 1) + ":" + (today.getMinutes() - length);
  }
  else {
    // 12am and need to increase hour, therefore need to increase date too
    time = (today.getHours() + 1) + ":" + (today.getMinutes() + length);
    date = today.getFullYear() + '-' + (today.getMonth() + 1 ) + '-' + (today.getDate() + 1);
  }

  // if month is single digit
  if (today.getMonth() < 10) {
    splice = date.split("-")
    date = splice[0] + "-0" + splice[1] + "-" + splice[2]
  }

  // if day is single digit
  if (today.getMonth() < 10) {
    splice = date.split("-")
    date = splice[0] + "-" + splice[1] + "-0" + splice[2]
  }


  firebase.database().ref("Fan").set({
    isTimer: true,
    stopTime: date + " " + time
  });
}
