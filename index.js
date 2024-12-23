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
//step 4
// /hello/<ID> is invoked, answers with: {status:200, message:"Hello, <ID>"}, where <ID> may be anything the user wanted to pass. The user may also not pass anything.
app.get('/hello/:id?', (req, res) => {
    // Route parameters: are placeholders in the URL path that capture dynamic values. They are defined using : in the route. (optional with ?)
    //using ? it means id presence isnt mandotory
    const id = req.params.id || "stranger"; //req.params: This object contains the route parameters passed in the URL.
    // Default to "stranger" if no ID is provided // let result = expression1 || expression2; IF EXP 1 TRUE, RETURN IT, ELSE RETURN ESP 2
    res.status(200).json({
        status: 200,
        message: `Hello ${id}`
    });
});


//SEARCH
app.get('/search', (req, res) => {
    //Query parameters are key-value pairs appended to the URL after a ?. They are used to pass optional information to the server. (always optional)
    const searchQuery = req.query.s;
// /search?s=example, searchQuery would be "example". (they are separated by &)
    if (searchQuery) { //if s exists
        res.status(200).json({
            status: 200,
            message: "ok",
            data: searchQuery
        });
    } else {
        res.status(500).json({
            status: 500,
            error: true,
            message: "you have to provide a search"
        });
    }
});

//5
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
];

// Routes
//add
app.get('/movies/create', (req, res) => {
    res.json({ status: 200, message: 'Create movie route placeholder' });
});

app.get('/movies/read', (req, res) => { //answers with the list of mobies'

    res.json({ status: 200, data: movies });
});

app.get('/movies/update', (req, res) => {
    res.json({ status: 200, message: 'Update movie route placeholder' });
});

app.get('/movies/delete', (req, res) => {
    res.json({ status: 200, message: 'Delete movie route placeholder' });
});
/*
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 
*/