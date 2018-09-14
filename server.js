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

app.get('/api/timestamp/:date_string', (req, res) => {
  //res.send('<h2 style="color: forestgreen;">API Endpoint reached successfully!</h1>');
  // if(res.params.date_string == null) {res.send(new Date())}
  let query = req.params.date_string;
  let regex = /\d{4}-?\d{2}-?\d{2}/g;
  
  if(regex.test(query)){
   // res.send('<h2 style="color: forestgreen;">query validated</h1>');
    let date = new Date();
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