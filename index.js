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
  try {
    let dateObj = new Date(date);
    return isNaN(dateObj.getTime()) ? null : dateObj.getTime();
  } catch (error) {
    return false;
  }
}

function getUTCDate(date){
  try {
    let dateObj = new Date(date).toUTCString();
    return isNaN(dateObj.getTime()) ? false : dateObj.toUTCString();
  } catch (error) {
    return false;
  }
}

function createResponseObject(date) {
  const unixDate = getUnixTime(date);
  const utcDate = getUTCDate(date);

  if (utcDate !== false && unixDate !== false) {
    return { unix: unixDate, utc: utcDate };
  } else {
    return ERROR_MESSAGE;
  }
}

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// get data as number only (unix date)
app.get('/api/:date(\\d+)', (req, res) => {
  const parsedDate = parseInt(req.params.date);
  const response = createResponseObject(parsedDate);
  res.json(response);
});

// get empty data parameter
app.get('/api/:date?', (req, res) => {
  const date = req.params.date || new Date();
  const response = createResponseObject(date);
  res.json(response);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
