//import express
const express = require('express');
//name it app (usually know as app)
const app = express();
//making it listen to port, port=3000 is commoly used for tests on nodejs
const port = 3000;

//Basic Route to Respond with "ok"(* is for all) wildcard route
/*app.get('*', (req, res) => {
    res.send('ok');
});*/

// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//with Express, create a route such as, when the url /test is invoked, answers: {status:200, message:"ok"}
/* using json
app.get('/test',(req,res) =>{
    res.json({
        status: 200,
        message: "ok"
    });
});
//res.status(code).send(message);
//bland
app.get('/test',(req,res) =>{
    res.status(200).send("okr");
});*/
//using json + status
app.get('/test',(req,res) =>{
    res.status(200).json({
        status: 200,
        message: "ok"
    });
});

//create a route such as, when the url /time is invoked, answers with: {status:200, message:<TIME>}, where <TIME> is the current time
app.get('/time', (req, res) => {
    const currentTime = new Date(); //AUTOMATICALLY CApture the date
    const hours = currentTime.getHours(); //currentTime.getHours() extracts the hours part of the current time (in 24-hour format) from the Date object.
    const minutes = currentTime.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`; //? '0' : '' (Ternary Operator): if-else
    
    res.status(200).json({
        status: 200,
        message: formattedTime
    });
});
