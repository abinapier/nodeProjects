const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// tell it to use the public directory as one where static files live
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// set up a rule that says requests to "/math" should be handled by the
// handleMath function below
app.get('/rate', handleRate);

// start the server listening
app.listen(port, function() {
  console.log('Node app is running on port', port);
});


/**********************************************************************
 * Ideally the functions below here would go into a different file
 * but for ease of reading this example and seeing all of the pieces
 * they are listed here.
 **********************************************************************/

function handleRate(request, response) {
	const type = request.query.type;
	const weight = Number(request.query.weight);
	

	// TODO: Here we should check to make sure we have all the correct parameters

	computeRate(response, type, weight);
}

function computeRate(response, type, weight) {

	let rate = 0;

	if(type=='stamp' || type=='meter'){
		if(weight>3.5){
			type = 'flat';
		}
	}

	switch (type){
		case 'stamp':
			if(weight<=1){
				rate = .55;
			}else if(weight<=2){
				rate = .7;
			}else if(weight<=3){
				rate = .85;
			}else if(weight<=3.5){
				rate = 1;
			}
			break;
		case 'meter':
			if(weight<=1){
				rate = .50;
			}else if(weight<=2){
				rate = .65;
			}else if(weight<=3){
				rate = .80;
			}else if(weight<=3.5){
				rate = .95;
			}
			break;
		case 'flat':
			if(weight<=1){
				rate = 1;
			}else if(weight<=2){
				rate = 1.2;
			}else if(weight<=3){
				rate = 1.4;
			}else if(weight<=4){
				rate = 1.6;
			}else if(weight<=5){
				rate = 1.8;
			}else if(weight<=6){
				rate = 2;
			}else if(weight<=7){
				rate = 2.2;
			}else if(weight<=8){
				rate = 2.4;
			}else if(weight<=9){
				rate = 2.6;
			}else if(weight<=10){
				rate = 2.8;
			}else if(weight<=11){
				rate = 3;
			}else if(weight<=12){
				rate = 3.2;
			}else if(weight<=13){
				rate = 3.4;
			}
			break;
		case 'package':
			if(weight<=1){
				rate = 3.8;
			}else if(weight<=2){
				rate = 3.8;
			}else if(weight<=3){
				rate = 3.8;
			}else if(weight<=4){
				rate = 3.8;
			}else if(weight<=5){
				rate = 4.6;
			}else if(weight<=6){
				rate = 4.6;
			}else if(weight<=7){
				rate = 4.6;
			}else if(weight<=8){
				rate = 4.6;
			}else if(weight<=9){
				rate = 5.3;
			}else if(weight<=10){
				rate = 5.3;
			}else if(weight<=11){
				rate = 5.3;
			}else if(weight<=12){
				rate = 5.3;
			}else if(weight<=13){
				rate = 5.9;
			}
			break;
	}
	


	// Set up a JSON object of the values we want to pass along to the EJS result page
	const params = {parcelType: type, parcelWeight: weight, parcelRate: rate};

	// Render the response, using the EJS page "result.ejs" in the pages directory
	// Makes sure to pass it the parameters we need.
	response.render('pages/rate', params);

}