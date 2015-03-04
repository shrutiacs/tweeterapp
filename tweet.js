var express= require("express");
var app= express();
var bodyParser=require('body-parser')
app.use(express.static(__dirname + '/public'));
var Twitter = require('twitter');
var mongojs = require('mongojs');
var db = mongojs("tweetSchema",["tweetdb"])
 
var client = new Twitter({
  consumer_key: 'Xyae9jmhbsV96ywdacXvRn9Dv',
  consumer_secret: 'nzK7KaaHFQwitfO1BRIFDL1fQvY5Qk1KJkWZojNrLLHHySId85',
  access_token_key: '357954811-Y4Zv9zJOorwcuuUFyZXpm7FleGFF9l2U1COMGcPE',
  access_token_secret: 'Etg1FU6468Zu202b7y2I75LWwfXDipOcKf8om5ll4u8bk'
});
 
app.get("/tweet", function (req, res) { 
params = {q: 'obama', count:5};
client.get('search/tweets', params, function(error, tweets, response){
  if (!error) {
  	console.log(tweets.statuses.length);
  	for(i=0;i<tweets.statuses.length;i++){
	db.tweetdb.insert({text :tweets.statuses[i].text});
  		//console.log(tweets.statuses[i].entities.hashtags);
  		console.log(tweets.statuses[i].text);
  		//console.log(tweets.statuses[i].favorites_count);
  			
  	}
  //	res.json({text :tweets.statuses[0].text});
  	res.json(tweets);
  	/*db.tweetdb.find(function(err,doc){
  		res.json({text :"doc",count:"4"});
  	});*/
  }else{
  		console.log(error);
    
  }
});
}); 

app.listen(process.env.PORT||5000);
console.log("Server running on port no. 5000");
