const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

const env = process.env;
const args = process.argv.slice(2);

let serverHost = env.VCAP_APP_HOST || "127.0.0.1";
let serverPort = env.VCAP_APP_PORT || 3000;

function headers(req, res, type) {
	res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
	res.header("Expires", "-1");
	res.header("Pragma", "no-cache");
	if (type) res.type(type);
}

app.get("/", function(req, res) {
	headers(req, res);
	res.render("index", { title: "Example", message: "Hello world!" })
});

app.listen(serverPort, serverHost, function() {
	console.log("Listening on: http://" + serverHost + ":" + serverPort);
});
