#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');


/*
	Express App configuration
*/
const app = express();
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

/*
    Upload configuration
 */
app.use(fileUpload({
	limits: { fileSize: 10 * 1024 * 1024 }, // ~10mb upload limit
}));
process.env.UPLOAD_DIR = path.resolve(__dirname, "./uploads");

/*
	Load the Controllers / Register Controller Routes
*/
const controllersPath = path.resolve(__dirname, "./controller/") + "/";
let fileNames = fs.readdirSync(controllersPath);
fileNames.forEach((fileName) => {
	let controller = require(controllersPath + fileName);
	if (typeof controller === 'object') { // ignores abstract (uninitiated) Controller
		controller.registerRoutes(app);
	}
});

/*
    API Response handler
 */
app.use("/api", (req, res) => { res.json(res.data); });

/*
    API Error handler
 */

app.use("/api", (err, req, res, next) => {
	const statusCode = error.statusCode ? error.statusCode : 500;
	console.log(serializeError(error));
	res.status(statusCode).json(error.message);
});

/*
    Direct all other calls to front end UI
 */
app.get("*", (req, res) => res.sendFile(publicPath + "/index.html"));

/*
    Start server
*/
const server = app.listen(3000, (err) => {
	if (err) console.log(err);
	else {
		let address = server.address().address;
		let port = server.address().port;
		console.log("Started project, listening on " + address + ":" + port);
	}
});

// Shutdown node gracefully when receive SIGINT/SIGTERM signals (for Docker)
exitOnSignal('SIGINT');
exitOnSignal('SIGTERM');
process.stdin.resume();

function exitOnSignal(signal) {
	process.on(signal, () => {
		process.exit(0);
	});
}