var filesave,temp,tms,date,x = 1,xamp, local;

//////////////////////////Time/////////////////////////////
function Time(){
   var dateInfo = new Date();
   var hr,
   _min = (dateInfo.getMinutes() < 10) ? "0" + dateInfo.getMinutes() : dateInfo.getMinutes(),
   sec = (dateInfo.getSeconds() < 10) ? "0" + dateInfo.getSeconds() : dateInfo.getSeconds(),
   amps = (dateInfo.getHours() >= 12) ? "PM" : "AM";
   if (dateInfo.getHours() == 0) {hr = 12;} 
   else if (dateInfo.getHours() > 12) {hr = dateInfo.getHours() - 12;}
   else {hr = dateInfo.getHours();}
   var currentTime = hr + ":" + _min;
   tms = currentTime + " " + amps;
   var dow = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], month = ["January","February","March","April","May","June","July","August","September","October","November","December"],day = dateInfo.getDate();
   date = dow[dateInfo.getDay()] + ", " + month[dateInfo.getMonth()] + " " + day;
   }

Time();
setInterval(function() {
   Time()
}, 1000);

///////////////////////From Modal Main to System Main///////////////////////////
function init(){
   document.mains.mem2.value = "";
   document.mains.mem1.value = "";
}

function push_data() {                    
   var a = document.mains.mem1.value;
   document.getElementById("input1").innerHTML = a;
   document.getElementById("name").innerHTML = "Meeting Topic is <i>" + a + "</i> which is happening on <i>" + date + "</i>";
   temp = a;
   localStorage.setItem("Topic", a);
   localStorage.setItem("Orgnizer", document.mains.mem2.value);
   checkercontent();
    setInterval(function() {
      checkercontent()
}, 10);
}

function edit(xamp){
   local = xamp;
   document.getElementById("old_data").innerHTML = document.getElementById("note" + xamp).innerHTML;
   document.getElementById("input3").value = "";
   var overlay = $('<div id="overlay"></div>');
   overlay.show();
   overlay.appendTo(document.body);
   $('.popup2').show();
   $('.close2').click(function(){
      $('.popup2').hide();
      overlay.appendTo(document.body).remove();
      return false;
   });
   $('.x').click(function(){
      $('.popup2').hide();
      overlay.appendTo(document.body).remove();
      return false;
   });
}

$(function(){
   var overlay = $('<div id="overlay"></div>');
   overlay.show();
   overlay.appendTo(document.body);
   $('.popup').show();
   $('.close').click(function(){
      $('.popup').hide();
      overlay.appendTo(document.body).remove();
      return false;
   });
   $('.x').click(function(){
      $('.popup').hide();
      overlay.appendTo(document.body).remove();
      return false;
   });
});

//////////System Main Value Input and Auto Sve to browser Local Storage//////////
function make(){
   localStorage.setItem("datavalue", x)
   if (x % 2 == 1){
      $(document).ready(function() {
      $('#add-msg').append('<div class="chat-container"><div class="chat-sender msg"><strong><p id="t' + x +'">' + tms + '&nbsp;&nbsp;&nbsp;<input type="button" id="edit' + x + '" class="edit" onclick="edit(' + x +')" value="Edit"></p></strong><div class="chatmsg" id="note' + x + '">' + document.getElementById("input").value + '</div><br></div></div><p style="display:none;" id="tmr' + x +'">' + tms + '</p>');})
      x = x + 1;
      } 
   else if (x % 2 == 0){
      $(document).ready(function() {
      $('#add-msg').append('<div class="chat-container"><div class="chat-respond msg"><strong><p id="t' + x +'">' + tms + '&nbsp;&nbsp;&nbsp;<input type="button" id="edit' + x + '" class="edit2" onclick="edit(' + x +')" value="Edit"></p></strong><div class="chatmsg" id="note' + x + '">' + document.getElementById("input").value + '</div><br></div><p style="display:none;" id="tmr' + x +'">' + tms + '</p>');})
      x = x + 1;
   }
   document.getElementById("input").value = "";
   filesave = "";
   filesave = "<h2 align='center'>Minutes<br>Meeting Title: " + document.mains.mem1.value + "<br>Organisation Name: " + document.mains.mem2.value + "</h2><h4><br>Meeting Date: " + date + "<br>Meeting Time: " + tms + "</h4><hr>";
   for (var i = 1; i < x; i++){
      filesave = filesave + "<br><p><b>" + document.getElementById("tmr" + i).innerHTML +"</b><i>: " + document.getElementById("note" + i).innerHTML + "</i></p>";
      localStorage.setItem("minute"+i , document.getElementById("note" + i).innerHTML);
      localStorage.setItem("time"+i , document.getElementById("tmr" + i).innerHTML);
   }
   localStorage.setItem("internal","valid");
}

function update(){
   document.getElementById("note" + local).innerHTML = document.getElementById("input3").value;
   filesave = "";
   filesave = "<h2 align='center'>Minutes<br>Meeting Title: " + document.mains.mem1.value + "<br>Organisation Name: " + document.mains.mem2.value + "</h2><h4><br>Meeting Date: " + date + "<br>Meeting Time: " + tms + "</h4><hr>";
   for (var i = 1; i < x; i++){
      filesave = filesave + "<br><p><b>" + document.getElementById("tmr" + i).innerHTML +"</b><i>: " + document.getElementById("note" + i).innerHTML + "</i></p>";
   }
   localStorage.setItem("minute"+local , document.getElementById("note" + local).innerHTML);
   localStorage.setItem("internal","valid");
}

///////////////////////Pre Initialisation and Downloading//////////////////////////
function init_bef_dwn(){
   filesave = "";
   filesave = "<h2 align='center'>Minutes<br>Meeting Title: " + document.mains.mem1.value + "<br>Organisation Name: " + document.mains.mem2.value + "</h2><h4><br>Meeting Date: " + date + "<br>Meeting Time: " + tms + "</h4><hr>";
   for (var i = 1; i < x; i++){
      filesave = filesave + "<br><p><b>" + document.getElementById("tmr" + i).innerHTML +"</b><i>: " + document.getElementById("note" + i).innerHTML + "</i></p>";
   }
   download(filesave,'meeting.html','text/plan;charset=utf-8');
}

function download(data, filename, type) {
   var file = new Blob([data], {type: type});
   if (window.navigator.msSaveOrOpenBlob)
      window.navigator.msSaveOrOpenBlob(file, filename);
   else {
      var a = document.createElement("a"),
      url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
         document.body.removeChild(a);
         window.URL.revokeObjectURL(url);  
      }, 0); 
   }
}

/////////////////////////Responsive Webpage Edit/////////////////////
function checkercontent(){
   if (screen.width <= 1100){
      document.getElementById("name").innerHTML = "Minutes Of Meeting";
      document.getElementById("button2").value = "Download";
   }
else if (screen.width > 1100){
   document.getElementById("name").innerHTML = "Meeting Topic is <i>" + temp + "</i> which is happening on <i>" + date + "</i>";
   document.getElementById("button2").value = "Download File";
}
}

//////////////////////////Backup Data Restore/////////////////////////////
function loadSave(){
   x = Number(localStorage.getItem("datavalue")) + 1;
   if (localStorage.getItem("internal") == "clear"){
      alert("No Data Found");
   }
   else{
      alert("Minutes Imported from a previous backup");
      document.mains.mem2.value = localStorage.getItem("Orgnizer");
      document.mains.mem1.value = localStorage.getItem("Topic");
      for (i=1;i<x;i++){
         if (i % 2 == 1){
            $(document).ready(function() {
            $('#add-msg').append('<div class="chat-container"><div class="chat-sender msg"><strong><p id="t' + i +'">' + localStorage.getItem("time" + i) + '&nbsp;&nbsp;&nbsp;<input type="button" id="edit' + i + '" class="edit" onclick="edit(' + i +')" value="Edit"></p></strong><div class="chatmsg" id="note' + i + '">' + localStorage.getItem("minute" + i) + '</div><br></div></div><p style="display:none;" id="tmr' + i +'">' + localStorage.getItem("time" + i) + '</p>');})
         } 
         else if (i % 2 == 0){
            $(document).ready(function() {
            $('#add-msg').append('<div class="chat-container"><div class="chat-respond msg"><strong><p id="t' + i +'">' + localStorage.getItem("time" + i) + '&nbsp;&nbsp;&nbsp;<input type="button" id="edit' + i + '" class="edit2" onclick="edit(' + i +')" value="Edit"></p></strong><div class="chatmsg" id="note' + i + '">' + localStorage.getItem("minute" + i) + '</div><br></div><p style="display:none;" id="tmr' + i +'">' + localStorage.getItem("time" + i) + '</p>');})
         }
      }
   }
}