var request = require("request");

exports.handler = async (event) => {
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

  request(uriString, function (error, response, body) {
    if (error) {
      return {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          message:
            "Could not retrieve latest glucose reading. Check URL of Nightscout site.",
        }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ glucose: JSON.parse(body)[0] }),
      };
    }
  });
};
