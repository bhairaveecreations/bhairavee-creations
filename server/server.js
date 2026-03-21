const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

dotenv.config();
connectDB();

const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.FRONTEND_URL
    ],
    credentials: true
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

app.get("/", (req, res) => {
  res.send("API running");
});
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/custom-orders", require("./routes/customOrderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);