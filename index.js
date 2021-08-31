const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const helmet = require('helmet');
const PORT = process.env.PORT || 5000;
const serverTimingMiddleware = require('server-timing-header');

// middleware
app.use(helmet.hidePoweredBy({ setTo: 'foo' })); 
app.disable('x-powered-by')
app.use(helmet());
app.use(helmet.hidePoweredBy())
app.use(express.json()) //allows access req.body
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(serverTimingMiddleware({sendHeaders: (process.env.NODE_ENV !== 'production')}));

// simple invalid JWT handling 

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({"verified": false});
    }
  });

// check production or dev env
if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "./client/build")))
}

// routes
app.use("/", require("./server/routes/jwtAuth"));

app.use("/password-reset", require("./server/routes/passwordReset"));

app.use("/recipes", require("./server/api/recipes"));

app.use("/journals", require("./server/api/journals"));

app.use("/shots", require("./server/api/shots"));


app.use(express.static(path.join(__dirname, 'build')));

// Server send
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// })

// listening...
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}....`)
});