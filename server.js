var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('contactList', ['contactList']);

var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactList', function(req, res){

	console.log('I recieved a GET request');

	// person1 = {

	// 	name: 'tim',
	// 	email: 'bernlee@gmail.com',
	// 	number: '59546846'

	// };

	// person2 = {

	// 	name: 'john',
	// 	email: 'oliver@gmail.com',
	// 	number: '65468468'

	// };

	// person3 = {

	// 	name: 'jim',
	// 	email: 'fuher@gmail.com',
	// 	number: '1658468'

	// };

	// var contactList = [person1, person2, person3];

	// res.json(contactList);

	db.contactList.find(function(err, docs){

		console.log(docs);
		res.json(docs);

	});

});

app.post('/contactList', function(req, res){

	console.log(req.body);
	db.contactList.insert(req.body, function(err, doc){

		res.json(doc);

	});

});

app.delete('/contactList/:id', function(req, res){

	var id = req.params.id;
	console.log(id);
	db.contactList.remove({_id: mongojs.ObjectId(id)}, function(err, doc){

		res.json(doc);

	});

});

app.get('/contactList/:id', function(req, res){

	var id = req.params.id;
	console.log(id);
	
	db.contactList.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		
		res.json(doc);
		
	});

});


app.put('/contactList/:id', function(req, res){

	var id = req.params.id;

	console.log(req.body.name);

	db.contactList.findAndModify({query: {_id: mongojs.ObjectId(id)}, 

		update : {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function(err, doc){

			res.json(doc);

	});
	
});

app.get('/fContactList/:name', function(req, res){

	var fName = req.params.name;

	//console.log(fname);

	if(req.params.name.indexOf('@') > -1)
	{
  		db.contactList.findOne({"email": req.params.name}, function(err, doc){
		
			res.json(doc);
		
		});
	}

	else
	{

		db.contactList.findOne({"name": req.params.name}, function(err, doc){
		
			res.json(doc);
		
		});
	}

});



app.listen(3000);

console.log("server running on port 3000");