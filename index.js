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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// get empty data paramenter
app.get('/api/:date?', (req, res, next) => {
  let date = req.params.date;
  // Check if the date parameter is undefined, null, or an empty string
  if (date === undefined || date === null || date.trim() === '') {
    date = new Date();
    let unixDate = Math.floor(date.getTime() / 1000);
    date = date.toUTCString();
    res.json({ unix: unixDate, utc: date });
  }
  next();
});

// get data as number only
app.get('/api/:date(\\d+)', (req, res, next) => {
  const parsedDate = parseInt(req.params.date, 10);
  if (isNaN(parsedDate)) {
    res.json({ error: "Invalid Date" });
  } else {
    let date = new Date(parsedDate).toUTCString();
    res.json({ unix: parsedDate, utc: date });
  }
  next();
});

// get data as us date-format only
app.get('/api/:date?', (req, res) => {
  const parsedDate = new Date(req.params.date);
  if (isNaN(parsedDate)) {
    res.json({ error: "Invalid Date" });
  } else {
    let date = parsedDate.toUTCString();
    let unixDate = Math.floor(parsedDate.getTime() / 1000);
    res.json({ unix: unixDate, utc: date });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
