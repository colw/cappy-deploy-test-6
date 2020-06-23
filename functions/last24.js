var got = require("got");
require("dotenv").config();

exports.handler = async (event, context) => {
  const now = new Date();
  const uri = process.env.NS_URI;
  const path = "/entries";
  const options = [
    "now=" + now.getTime(),
    "token=" + process.env.NS_TOKEN,
    "fields=sgv,dateString",
    "sort$desc=dateString",
    "limit=288",
  ].join("&");

  const uriString = uri + path + "?" + options;
  console.log(uriString);
  const response = await got.get(uriString);
  return {
    statusCode: 200,
    body: JSON.stringify({ glucoseValues: JSON.parse(response.body) }),
  };
};
