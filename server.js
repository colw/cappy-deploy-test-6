import express from "express";
import request from "request";
import path from 'path'

const app = express();

app.use(express.static("public"));
const __dirname = path.resolve();

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/app/index.html");
});

app.get("/latest", function(req, res) {
  const now = new Date();
  const uri = process.env.NS_URI;
  const path = "/entries";
  const options = [
    "now=" + now.getTime(),
    "token=" + process.env.NS_TOKEN,
    "fields=sgv,direction,dateString",
    "sort$desc=dateString",
    "limit=1"
  ].join("&");
  const uriString = uri + path + "?" + options;
  const latest = request(uriString, function(error, response, body) {
    if (response && response.statusCode === 404) {
      res.status(500).json({
        error:
          "Could not retrieve latest glucose reading. Check URL of Nightscout site."
      });
    } else {
      res.status(200).json({ glucose: JSON.parse(body)[0] });
    }
  });
});

app.get("/last24", function(req, res) {
  const now = new Date();
  const uri = process.env.NS_URI;
  const path = "/entries";
  const options = [
    "now=" + now.getTime(),
    "token=" + process.env.NS_TOKEN,
    "fields=sgv,dateString",
    "sort$desc=dateString",
    "limit=288"
  ].join("&");
  const uriString = uri + path + "?" + options;
  const latest = request(uriString, function(error, response, body) {
    if (response && response.statusCode === 404) {
      res.status(500).json({
        error:
          "Could not retrieve last 24 hours of glucose values. Check URL of Nightscout site."
      });
    } else {
      res.status(200).json({ glucoseValues: JSON.parse(body) });
    }
  });
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
