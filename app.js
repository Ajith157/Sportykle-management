const cors = require('cors');
const express = require("express");
var multer = require('multer');
var upload = multer();
var https = require('https')
const bodyParser = require("body-parser");
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const path = require('path')

app.use(express.static('public'));
app.use(express.static('public/uploads'));
app.use('*/images',express.static('public/uploads'));

const formData = require('express-form-data');
const os = require("os");

const options = {
  uploadDir: 'public/uploads/',
  autoClean: false
};
// parse data with connect-multiparty.
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream
app.use(formData.stream());
// union the body and the files
app.use(formData.union());


app.use(cors());
app.options('*', cors());
app.use(function(req, res, next) {
//set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// simple route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Sportykle." });
});

app.get("/api/mytest", (req, res) => {
  
  var {google} = require('googleapis');
  var MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
  var SCOPES = [MESSAGING_SCOPE];

  return new Promise(function(resolve, reject) {
      var key = require('./controllers/cinephile.json');
      var jwtClient = new google.auth.JWT(
          key.client_email,
          null,
          key.private_key,
          SCOPES,
          null
      );
      jwtClient.authorize(function(err, tokens) {
          if (err) {
              reject(err);
              return;
          }
          resolve(tokens.access_token);
          console.log(tokens.access_token);

          var PROJECT_ID = 'cinephile-4d270';
          var HOST = 'fcm.googleapis.com';
          var PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';

          var options = {
              hostname: HOST,
              path: PATH,
              method: 'POST',
              headers: {
                  'Authorization': 'Bearer ' + tokens.access_token
              },
              data: JSON.stringify({
                "message": {
                  "notification": {
                    "title": "Push notifications with Firebase",
                    "body": "Push notifications with Firebase body"
                  },
                  "webpush": {
                    "fcmOptions": {
                      "link": "http://localhost:3000"
                    },
                    "notification": {
                      "icon": "https://picsum.photos/200"
                    }
                  },
                  "token": "cNazpP_YT16MJs9dgLEPIV:APA91bHbGG2DLwpL24QtSkUaAVDnQQasgF9YJjM_xmsmCWuO1nMFenOpFmuouAWoM1RAxbLGQbnaT-Omp1rGRWA9diQKIhDQthLSKbr4DtF5hZP-CAa43eAlzT9M8laE8MiXVJUNaB_O"
                }
              })
          };
          console.log(options);
          var request = https.request(options, function(resp) {
              resp.setEncoding('utf8');
              resp.on('data', function(data) {
                  console.log('Message sent to Firebase for delivery, response:');
                  console.log(data);
              });
          });
          request.on('error', function(err) {
              console.log('Unable to send message to Firebase');
              console.log(err);
          });
          //request.write(JSON.stringify(fcmMessage));
          request.end();
      });
 });

});

console.log(app);

require("./routes/routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
