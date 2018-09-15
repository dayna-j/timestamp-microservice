var express = require('express');
// instantiate the express web-app framework
var app = express();

// enable CORS so that API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  

// middleware that allows express to serve static resources.  
// express works with dynamically generated content by default
app.use(express.static('public'));

app.get("/", function (req, res) {
  // responds to get requests at root directory with front-end html file.
  // This is made possible by using express.static middleware
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/timestamp', (req,res) => {
  // handler for empty request.  Satisfies user story #3
  let dateString = req.params.date_string;
  let date = new Date();
  res.json({"unix": date.getTime(dateString), "utc" : date.toUTCString(dateString) });

});

app.get('/api/timestamp/:date_string', (req, res) => {
  //res.send('<h2 style="color: forestgreen;">API Endpoint reached successfully!</h1>');
  
  // date_string is received from the browser as a string
  let dateString = req.params.date_string;
  
  console.log(typeof req.params.date_string);
  console.log(dateString);
  console.log(dateString.split('-'));
  
  let regex = /\d{4}-?\d{2}-?\d{2}/g;
    
  if(regex.test(dateString)){
    // date_string passes regex validation
    
    let date = new Date(dateString);
    
    if(dateString.split('').includes('-')) {
    // date_string is valid and contains ' - ' characters
      let dateArr = dateString.split('-');
      
      
    } else {
    // date_string is valid but does NOT include " - " characters
    
    }
    
    res.json({"unix": date.getTime(), "utc" : date.toUTCString() });
    } else {
  // fails regex test
    res.json({"unix": null, "utc" : "Invalid Date" });
  }  
  
});


// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});