const express = require('express');
const cors = require('cors')

// Create server, it's the variable "app" 
const app = express();

// MIDDLEWARES
app.use(express.json());
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};
app.use(cors(corsOptions));


// Setting up cloudinary configuration
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// ROUTES
app.get("/", (req, res) => {
  res.json({message : "Full Project 1 - API Ecommerce MERN - Pizzeria"});
});
app.use('/api/auth', require('../server/routes/Auth.Routes'))
// app.use('/api/users', require('../server/routes/Users.Routes'))
app.use('/api/products', require('../server/routes/Products.Routes'))
// app.use('/api/restaurants', require('../server/routes/Restaurants.Routes'))

app.all("*", (req, res) => {
  res.status(404).json({ message: "This routes doesn't exist" });
});

module.exports = app