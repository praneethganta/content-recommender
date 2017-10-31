$(document).ready(function(){
  load_data();
});

function load_data(){
var xhrWords = new XMLHttpRequest();
var data = document.getElementById(id).innerText;
console.log(data);
xhrWords.onreadystatechange = function() {
   if (this.readyState == 4) {
     var w = window.open('recommendations.html','_self',true);
    w.document.open();
    w.document.write(this.responseText);
    w.document.close();
   }
 }
xhrWords.open('GET', '/home', true);
xhrWords.setRequestHeader( "Content-Type", "application/json; charset=UTF-8" );
xhrWords.send(JSON.stringify({"data" : data}));
}
