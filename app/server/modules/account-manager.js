
// Elastic search end point is defined here
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: '' , // Your ElasticSearch API Endpoint
  log: 'trace'
});

exports.updateActivity = function(user, activity, callback)
{
	client.query('INSERT INTO user_activity(username, activity) values($1,$2)',[user,activity],(err, result) => {
	if (err) {
		callback(false,"Insert error");
	}
	else {
		callback(true, "Insert successful");
	}
});
}

// Querying for the recommendations on elasticsearch and selecting top 10 is done here //

exports.getRecommendationsData = function(queryString, callback){
  console.log(queryString);
  client.search({
  index: 'adaptive',
  type: 'recommend',
  body: {
    query: {
      multi_match: {
        query: queryString,
        fields: ["content", "subHeading"]
      }
    }
  }
}).then(function (resp) {
    var recommendationList = resp.hits.hits;
    var snippet = "";
      for (var i = 0; i < 10;i++){
        //console.log(recommendationList[i]["_source"]["content"] + "/n/n/n/n/n")
        if(i > 10) {break;
        }
        else {
          snippet = snippet +  `</br></br></br><div class="col-sm-12">
             <div class="layout_box">
                 <div class="layout_box_header">
                     <input style="font-size: 20px;"value="Recommendation ` + (i + 1).toString() +`" disabled>
                 </div>
                 <div class="layout_box_content">
                 <h2>`+ recommendationList[i]["_source"]["subHeading"] +`</h2>
                     <div>` +  recommendationList[i]["_source"]["content"] + `</br>`+`
                     </br><label style="font-size: 16px;">For further reference please refer to: &nbsp</label><a href="`+ recommendationList[i]["_source"]["url"]+`">`+ recommendationList[i]["_source"]["url"]+`</a></br><label style="font-size: 16px;">Score: &nbsp</label>`+recommendationList[i]["_score"]+`</div>
                 </div>
             </div>
         </div>`;

        }


      }

    // var content_source =  j;
    // var source =  JSON.parse(content_source);
    callback(true, snippet);
}, function (err) {
    console.trace(err.message);
});

}
