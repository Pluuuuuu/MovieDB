//import express
const express = require('express');
//name it app (usually know as app)
const app = express();
//making it listen to port, port=3000 is commoly used for tests on nodejs
const port = 3000;

//Basic Route to Respond with "ok"(* is for all) wildcard route
app.get('*', (req, res) => {
    res.send('ok');
});

// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
