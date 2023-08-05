require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const passwordResetRoutes = require("./routes/passwordReset");
const generalRoutes =require("./routes/general");
const clientRoutes=require("./routes/client")
const populationRoutes=require("./routes/population")
const moduleRoutes=require ("./routes/module")
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);
//Admin panel
app.use("/general",generalRoutes)
app.use("/client",clientRoutes)
app.use("/pop",populationRoutes)
app.use("/mod",moduleRoutes)

//

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));