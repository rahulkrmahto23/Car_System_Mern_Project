const express = require("express");
const { config } = require("dotenv");
// const morgan = require("morgan");
 const appRouter = require("./routes/AppRoute");
const cookieParser = require("cookie-parser");
const db = require("./db/db");
//const cors = require("cors")
config();
const app = express();
const PORT = process.env.PORT;

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204
// };

// Middlewares
// app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// // Remove it in production
//app.use(morgan("dev"));

//Routes
app.use("/api/v1", appRouter);

//   Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
