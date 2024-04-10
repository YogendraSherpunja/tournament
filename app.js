const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const authRoutes = require('./routes/tournamentRoutes.js');
const protectedRoute = require('./routes/protectedRoute')
const tournamentRouter = require("./routes/tournamentRoutes.js");
const {verifyToken} = require("./middleware/authMiddleware");
const path = require("path");
const { fileURLToPath } = require("url");


const app = express();

const port = process.env.PORT || 8000;


// const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// Middleware


app.use(express.static('client/build'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({secret: "Your secret key"}));

app.use(express.json())
app.get("*", (req, res) => {
  res.sendFile(
      path.join(__dirname, "client/build/index.html")
  );
});

const cors = require("cors");
app.use(cors());


mongoose.connect(
 // "mongodb+srv://fashion_user:fashionpass1234@cluster0.bq1ctss.mongodb.net/TournaDb?retryWrites=true&w=majority",
 "mongodb+srv://yogendramagar15:b9QxHK2vpaouKzhx@cluster0.ptjiyut.mongodb.net/Tournament?retryWrites=true&w=majority&appName=Cluster",
).then(() =>{
  console.log('db connected')
}).catch((error) =>{
  console.log('error', error.message)
})

app.use('/users', authRoutes);
app.use('/protected', protectedRoute);
app.use('/tournaments', tournamentRouter);

app.use(tournamentRouter);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});