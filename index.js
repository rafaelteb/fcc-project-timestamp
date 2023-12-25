// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// setting variables
const ERROR_MESSAGE = { error: "Invalid Date" };

// adding utility functions here to keep things dry
function getUnixTime(date){
  let unixDate;
  try {
    let dateObj = new Date(dateObj);
    unixDate = Math.floor(dateObj.getTime() / 1000);
  } catch (error) {
    unixDate = false;
  }
  return unixDate;
}

function getUTCDate(date){
  let utcDate;
  try {
    utcDate = new Date(date).toUTCString();
  } catch (error) {
    utcDate = false;
  }
  return utcDate;
}

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// get data as number only (unix date)
app.get('/api/:date(\\d+)', (req, res, next) => {
  const parsedDate = parseInt(req.params.date);
  let unixDate = getUnixTime(par);
  let utcDate = getUTCDate(parsedDate);

  if (utcDate != false && unixDate !=false) {
    res.json({ unix: parsedDate, utc: utcDate });
  }
  next();
});

// get empty data paramenter
app.get('/api/:date?', (req, res) => {
  let date = req.params.date;
  
  // Check if the date parameter is undefined, null, or an empty string
  if (date === undefined || date === null || date.trim() === '') {
    date = new Date();
    let unixDate = getUnixTime(date);
    date = date.toUTCString();
    res.json({ unix: unixDate, utc: date });
  }

  // Check if unixdate and utcdate could be created
  let unixDate = getUnixTime(par);
  let utcDate = getUTCDate(parsedDate);
  if (utcDate != false && unixDate !=false) {
    res.json({ unix: unixDate, utc: date });
  }
  // Output error
  else {
    res.json(ERROR_MESSAGE);
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
