var got = require("got");
require("dotenv").config();

exports.handler = async (event, context) => {
  const now = new Date();
  const uri = process.env.NS_URI;
  const path = "/entries";
  const options = [
    "now=" + now.getTime(),
    "token=" + process.env.NS_TOKEN,
    "fields=sgv,direction,dateString",
    "sort$desc=dateString",
    "limit=1",
  ].join("&");

  const uriString = uri + path + "?" + options;
  const error = {};
  const r = await got.get(uriString);
  if (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        message:
          "Could not retrieve latest glucose reading. Check URL of Nightscout site.",
        uri: uriString,
      }),
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({ glucose: JSON.parse(reponse.body)[0] }),
    };
  }
};
