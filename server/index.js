const dotenv = require("dotenv");
const colors = require("colors");
const connectDB=require('./config/db');
dotenv.config();

const app = require("./app");

const PORT = process.env.PORT || 3001;

connectDB()
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) console.log(err);
      console.log("mudie server connected on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
