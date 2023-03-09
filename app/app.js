const express = require('express');
const cors = require('cors')
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);


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
app.use('/api/users', require('../server/routes/Users.Routes'))
app.use('/api/products', require('../server/routes/Products.Routes'))
// app.use('/api/restaurants', require('../server/routes/Restaurants.Routes'))


app.post("/api/payment", async (req, res) => {
  try {
    // console.log(req.body);
    // Je reçois un token du front
    const stripeToken = req.body.stripeToken;
    // Je fais une requête à stripe pour créer un paiement
    const responseFromStripe = await stripe.charges.create({
      amount: 2000,
      currency: "eur",
      description: "La description de l'objet acheté",
      source: stripeToken,
    });
    // Si le paiement est effectué, on met à jour l'offre et on renvoie au front le fait que tout s'est bien passé
    console.log(responseFromStripe);
    // Je renvoie au client le status de la réponse de stripe
    res.json(responseFromStripe.status);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This routes doesn't exist" });
});

module.exports = app