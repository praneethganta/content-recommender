
var AM = require('./modules/account-manager');
var queryString = "";
module.exports = function(app) {

// Home page which shows the Posts
	app.get('/', function(req, res){

			res.render('home');
	});

// Redirects to the recommendations page //
app.get("/recommend", function(req,res){
	console.log(queryString);
	AM.getRecommendationsData(queryString, function(status, snippet){
		res.render('recommendations',{data:snippet,query:queryString});
	});
})

// stores the query //

app.post('/getRecommendations', function(req,res) {
	queryString = "";
	 queryString = req.body.data;
	 res.status(200).send("ok");


});

};
