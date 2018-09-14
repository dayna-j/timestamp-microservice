var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp', (req,res) => {
  let date = new Date();
  res.json(date);

});

app.get('/api/timestamp/:date_string', (req, res) => {
  //res.send('<h2 style="color: forestgreen;">API Endpoint reached successfully!</h1>');

  let dateString = req.params.date_string;
  let regex = /\d{4}-?\d{2}-?\d{2}/g;
    
  if(regex.test(dateString)){
    // date_string passes regex validation
    
    let date = new Date();
    
//     if(dateString.split('').includes('-')){
//     // date_string is valid and contains ' - ' characters
//       let dateArr = dateString.split('-');
      
      
//     } else {
//     // date_string is valid but does NOT include " - " characters
    
//     }
    
    
    // res.send('<h2 style="color: forestgreen;">query validated</h1>');

    res.json({"unix": date.getTime(dateString), "utc" : date.toUTCString(dateString) });
    } else {
  // fails regex test
    res.json({"unix": null, "utc" : "Invalid Date" });
  }  
  
});


// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});