const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const helmet = require('helmet');
const PORT = process.env.PORT || 5000;



// middleware
app.use(helmet());
app.use(express.json()) //allows access req.body
app.use(express.urlencoded({extended: false}));
app.use(cors());

// simple invalid JWT handling 
/*
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...');
    }
  });*/


// check production or dev env
if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/client/build")))
}

// routes
app.use("/", require("./server/routes/jwtAuth"));

/*
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
})
*/

// listening...
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}....`)
});