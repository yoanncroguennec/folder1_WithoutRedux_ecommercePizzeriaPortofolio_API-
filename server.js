// Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config()
// require("dotenv").config();
const app = require('./app/app')

// CONNECT DB
const mongoose = require("mongoose");
const connectDatabase = async () => {
	try {
		mongoose.set("strictQuery", false);
		await mongoose.connect(process.env.DB_URI);
		console.log("Connect MongoDB folder1_ecommercePizzeriaPortfolio_Api");
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
connectDatabase();


// LISTEN V1
// Northflank va nous fournir une variable process.env.PORT
// if (process.env.PORT) {
//   app.listen(process.env.PORT, () => {
//     console.log("Server started");
//   });
// } else {
//   app.listen(3200, () => {
//     console.log("Server started");
//   });
// }

// LISTEN V2
app.listen(process.env.PORT || 3200, () => {
  console.log(`Server started in ${process.env.PORT } mode.`);
});
