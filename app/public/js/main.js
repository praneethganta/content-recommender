/*document.querySelectorAll('button').addEventListener('click', function () {
  getRecommendations(this.name);
}, false);
*/
var elementsArray = document.getElementsByTagName('button');
console.log(elementsArray);
for(var i = 0;i <elementsArray.length; i++){
  elementsArray[i].addEventListener("click", function() {
    getRecommendations(this.name);
  }, false);
}
function getRecommendations(id){
var xhrWords = new XMLHttpRequest();
var data = document.getElementById(id).innerText;
console.log(data);
xhrWords.onreadystatechange = function() {
   if (this.readyState == 4) {
     window.open("/recommend", "_blank");

   }
 }
xhrWords.open('POST', '/getRecommendations', true);
xhrWords.setRequestHeader( "Content-Type", "application/json; charset=UTF-8" );
xhrWords.send(JSON.stringify({"data" : data}));
}
