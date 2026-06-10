const express = require("express");
const app = express();
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactRoutes = require('./routes/Contact')
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");


// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  }),
);


//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactRoutes);


//default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: " Your Server is up and running...",
  });
});

module.exports = { app };
