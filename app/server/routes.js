
var AM = require('./modules/account-manager');
var queryString = "";
module.exports = function(app) {

// Root login page redirects to home page if user already logged in else to the login page //
	app.get('/', function(req, res){

			res.render('home');
	});


// logged-in user's homepage service which helps in viewing user's profile and login history  //
app.get("/recommend", function(req,res){
	console.log(queryString);
	AM.getRecommendationsData(queryString, function(status, snippet){
		res.render('recommendations',{data:snippet,query:queryString});
	});
})

app.post('/getRecommendations', function(req,res) {
	queryString = "";
	 queryString = req.body.data;
	 res.status(200).send("ok");


});

};
