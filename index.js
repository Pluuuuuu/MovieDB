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

//step 6
//asc by date
/*The .sort() function compares two items (e.g., a and b) in the array. It orders them based on:

Negative return value: a comes before b.
Zero return value: Order of a and b remains unchanged.
Positive return value: a comes after b.
The subtraction logic determines the order:

a - b → Sorts in ascending order.
b - a → Sorts in descending order.
*/
app.get('/movies/read/by-date', (req, res) => {
    //[...movies]: This creates a shallow copy of the movies array to ensure the original array is not modified by the sorting operation.
    const sortedMovies = [...movies].sort((a, b) => a.year - b.year); //Subtracts b.year from a.year: Negative: a comes first. Positive: b comes first
    res.status(200).json({
        status: 200,
        data: sortedMovies
    });
});

//ORDERED BY RATING, where the highest rating is at the top.
app.get('/movies/read/by-rating', (req, res) => {
    //[...movies]: This creates a shallow copy of the movies array to ensure the original array is not modified by the sorting operation.
    const sortedMovies = [...movies].sort((a, b) => b.rating - a.rating); 
    res.status(200).json({
        status: 200,
        data: sortedMovies
    });
});

//<MOVIES> is the list of movies ORDERED BY TITLE
app.get('/movies/read/by-title', (req, res) => {
    //-1: If string1 comes before string2 in the sort order. 0: If string1 and string2 are equivalent. 1: If string1 comes after string2 in the sort order.
    const sortedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
    res.status(200).json({
        status: 200,
        data: sortedMovies
    });
});
//step 7
app.get('/movies/read/id/:id', (req, res) => {
    const id = parseInt(req.params.id); // Get the ID from the URL and convert to number (initailly it will be string)

    // Check if the ID is valid and within the array bounds
    if (id >= 0 && id < movies.length) {
        res.status(200).json({
            status: 200,
            data: movies[id]
        });
    } else {
        res.status(404).json({
            status: 404,
            error: true, //actual 404 status code.
            message: `The movie with ID ${id} does not exist`
        });
    }
});

//8
//isNaN() function in JavaScript is used to determine whether a value is not a number. It returns: true if the value is not a number. false if the value is a number.
//parseFloat converts string into float
//paraint converts string into int
app.get('/movies/add', (req, res) => {
    const { title, year, rating } = req.query;

    // Validation: Check if title and year are provided and year is valid
    if (!title || !year || isNaN(year) || year.length !== 4) {
        return res.status(403).json({
            status: 403,
            error: true,
            message: "You cannot create a movie without providing a title and a valid year"
        });
    }

    // Assign a default rating if not provided
    const movieRating = rating ? parseFloat(rating) : 4;

    // Create the new movie object
    const newMovie = {
        title,
        year: parseInt(year), // Convert year to a number
        rating: movieRating
    };

    // Add the new movie to the array
    movies.push(newMovie);

    // Respond with the updated movie list
    res.status(200).json({
        status: 200,
        data: movies
    });
});

//9 // didnt work
app.delete('/movies/delete/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convert the ID from the URL to a number

    // Check if the ID is valid
    if (id >= 0 && id < movies.length) {
        // Remove the movie using splice
        const deletedMovie = movies.splice(id, 1); // Removes the movie at index 'id'

        // Respond with the updated movie list
        res.status(200).json({
            status: 200,
            message: "Movie deleted successfully",
            deletedMovie: deletedMovie[0], // Send the details of the deleted movie // deletedMovie[0]: Accesses the single deleted movie object.
            data: movies // Send the updated movies list
        });
    } else {
        // If the ID is invalid or does not exist
        res.status(404).json({
            status: 404,
            error: true,
            message: `The movie with ID ${id} does not exist`
        });
    }
});

//10 
